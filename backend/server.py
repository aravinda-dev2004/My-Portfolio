from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Application startup")
    yield
    # Shutdown
    logger.info("Application shutdown")
    client.close()

app = FastAPI(lifespan=lifespan)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    email: str
    message: str
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    email: str
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    """Handle contact form submissions and send email"""
    contact_dict = input.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.contact_messages.insert_one(doc)
    logger.info(f"New contact message from {input.email}")
    
    # Send email notification
    try:
        send_email_notification(input)
        logger.info(f"Email sent successfully from {input.email}")
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        # Continue even if email fails - message is saved in DB
    
    return contact_obj

def send_email_notification(contact_data: ContactMessageCreate):
    """Send email notification when contact form is submitted"""
    
    # Email configuration from environment variables
    smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
    smtp_port = int(os.getenv('SMTP_PORT', '587'))
    sender_email = os.getenv('SENDER_EMAIL', 'your-email@gmail.com')
    sender_password = os.getenv('SENDER_PASSWORD', '')
    receiver_email = os.getenv('RECEIVER_EMAIL', sender_email)
    
    # Debug logging
    logger.info(f"Attempting to send email...")
    logger.info(f"SMTP Server: {smtp_server}:{smtp_port}")
    logger.info(f"From: {sender_email}")
    logger.info(f"To: {receiver_email}")
    logger.info(f"Password configured: {bool(sender_password)}")
    
    if not sender_password:
        raise ValueError("SENDER_PASSWORD not configured in .env file")
    
    # Create message
    message = MIMEMultipart("alternative")
    message["Subject"] = f"Portfolio Contact from {contact_data.email}"
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Reply-To"] = contact_data.email
    
    # Create HTML email body
    html_body = f"""
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong style="color: #333;">From:</strong> <a href="mailto:{contact_data.email}">{contact_data.email}</a></p>
          </div>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #f9fafb; border-left: 4px solid #8b5cf6; border-radius: 5px;">
            <p style="margin: 0;"><strong style="color: #333;">Message:</strong></p>
            <p style="margin-top: 10px; color: #555; line-height: 1.6;">{contact_data.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
            <p>This email was sent from your portfolio website contact form.</p>
            <p>Reply directly to this email to respond.</p>
          </div>
        </div>
      </body>
    </html>
    """
    
    # Attach HTML body
    html_part = MIMEText(html_body, "html")
    message.attach(html_part)
    
    # Send email
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.set_debuglevel(1)  # Enable debug output
            logger.info("Connecting to SMTP server...")
            server.starttls()
            logger.info("Starting TLS...")
            if sender_password:
                logger.info("Logging in...")
                server.login(sender_email, sender_password)
                logger.info("Login successful!")
            logger.info("Sending email...")
            server.send_message(message)
            logger.info("Email sent successfully!")
    except Exception as e:
        logger.error(f"SMTP Error: {type(e).__name__}: {str(e)}")
        raise

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)