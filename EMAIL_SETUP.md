# Email Setup Guide for Contact Form

Your contact form is now configured to send emails! Follow these steps to set it up.

## 🔧 Setup Instructions

### Option 1: Gmail (Recommended for Testing)

1. **Enable 2-Factor Authentication**
   - Go to your Google Account: https://myaccount.google.com/security
   - Turn on 2-Step Verification

2. **Generate App Password**
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password (remove spaces)

3. **Update `.env` file in `backend/` folder:**
   ```env
   SMTP_SERVER=smtp.gmail.com
   SMTP_PORT=587
   SENDER_EMAIL=your-email@gmail.com
   SENDER_PASSWORD=your-16-char-app-password
   RECEIVER_EMAIL=your-email@gmail.com
   ```

### Option 2: Other Email Providers

#### Outlook/Hotmail
```env
SMTP_SERVER=smtp-mail.outlook.com
SMTP_PORT=587
SENDER_EMAIL=your-email@outlook.com
SENDER_PASSWORD=your-password
```

#### Yahoo Mail
```env
SMTP_SERVER=smtp.mail.yahoo.com
SMTP_PORT=587
SENDER_EMAIL=your-email@yahoo.com
SENDER_PASSWORD=your-app-password
```

#### Custom SMTP Server
```env
SMTP_SERVER=mail.yourdomain.com
SMTP_PORT=587
SENDER_EMAIL=contact@yourdomain.com
SENDER_PASSWORD=your-password
```

### Option 3: Professional Email Services (Production)

For production, consider using dedicated email services:

**SendGrid** (Free: 100 emails/day)
- Sign up: https://sendgrid.com
- Get API key
- Use their SMTP settings

**Mailgun** (Free: 1000 emails/month)
- Sign up: https://mailgun.com
- Use their SMTP settings

**AWS SES** (Pay as you go)
- Very cheap for high volume
- Requires AWS account

## 📧 How It Works

When someone fills out your contact form:
1. ✅ Message is saved to MongoDB
2. ✅ Email is sent to your inbox
3. ✅ Email includes sender's details
4. ✅ You can reply directly to the sender

## 🎨 Email Template

The email you receive will include:
- **Name** of the person contacting you
- **Email** address (with reply-to set up)
- **Subject** line they entered
- **Message** content
- Beautiful HTML formatting with purple theme

## 🔒 Security Tips

1. **NEVER commit `.env` file to Git**
   - Add `.env` to `.gitignore`
   - It's already there, but double-check!

2. **Use App Passwords, not regular passwords**
   - More secure
   - Can be revoked anytime

3. **For Production:**
   - Use environment variables in your hosting platform
   - Don't expose SMTP credentials in code

## 🧪 Testing

1. **Start your backend:**
   ```bash
   cd backend
   python server.py
   ```

2. **Start your frontend:**
   ```bash
   npm start
   ```

3. **Fill out the contact form** on your site

4. **Check your email inbox** for the notification

## ❌ Troubleshooting

### "Authentication failed"
- Double-check email and password
- Use App Password, not regular password
- Enable "Less secure app access" (Gmail legacy accounts)

### "Connection refused"
- Check SMTP_SERVER and SMTP_PORT
- Make sure port 587 is not blocked by firewall

### Email not received
- Check spam folder
- Verify RECEIVER_EMAIL is correct
- Check backend logs for errors

### "Password not accepted"
- For Gmail: Must use App Password
- For Outlook: May need to enable SMTP in settings

## 🚀 Next Steps

1. Update your `.env` file with real credentials
2. Test the form locally
3. When deploying, add environment variables to your hosting platform:
   - Heroku: `heroku config:set SENDER_EMAIL=...`
   - Vercel: Add in Project Settings
   - Netlify: Add in Site Settings
   - Railway: Add in Variables tab

## 📝 Example Configuration

Here's what your complete `.env` should look like:

```env
# Frontend
REACT_APP_BACKEND_URL=http://localhost:8000

# Backend MongoDB
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/
DB_NAME=portfolio
CORS_ORIGINS=http://localhost:3000

# Backend Email (Gmail Example)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SENDER_EMAIL=aravinda.portfolio@gmail.com
SENDER_PASSWORD=abcd efgh ijkl mnop
RECEIVER_EMAIL=aravinda.dev@gmail.com
```

## 💡 Pro Tips

- Test with a different email to see what senders receive
- Customize the email template in `server.py` for your branding
- Set up email filters/labels to organize contact form submissions
- Consider adding a "Thank You" page after form submission

---

**Need help?** The backend will log email errors to the console. Check there first if emails aren't sending!
