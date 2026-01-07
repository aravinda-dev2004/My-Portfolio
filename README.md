# Aravinda's Portfolio Website

A modern, responsive portfolio website built with React and Tailwind CSS, showcasing projects, skills, and providing ways to connect.

## 🎨 Features

- **Modern Design**: Dark theme with glassmorphism effects and smooth animations
- **Responsive Layout**: Fully mobile-responsive design with hamburger menu
- **Project Showcase**: Display your projects with descriptions and technologies
- **Skills Section**: Organized skill categories for easy browsing
- **Contact Form**: Integrated contact form with backend support
- **Social Links**: Quick links to GitHub, LinkedIn, and email
- **Smooth Scrolling**: Navigation with smooth scroll behavior
- **Animations**: Subtle hover effects and transitions

## 📁 Project Structure

```
.
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.jsx     # Main portfolio page
│   │   ├── components/
│   │   │   ├── ContactForm.jsx
│   │   │   └── ui/          # UI components (buttons, cards, etc.)
│   │   ├── App.js
│   │   └── mock.js          # Mock data (projects, skills, personal info)
│   └── package.json
│
├── backend/                  # FastAPI backend
│   ├── server.py            # Main server with contact form endpoint
│   └── requirements.txt
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB (for storing contact messages)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file with your MongoDB connection:
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=portfolio
CORS_ORIGINS=http://localhost:3000
```

4. Start the server:
```bash
python server.py
# or use uvicorn directly
uvicorn server:app --reload
```

The backend will be available at `http://localhost:8000`

## 🎯 Customization

### Update Your Personal Information

Edit `src/mock.js` to add your information:

```javascript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your tagline",
  about: "Your about section",
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername"
};
```

### Add Your Projects

Update the `projects` array in `src/mock.js`:

```javascript
export const projects = [
  {
    id: 1,
    title: "Project Name",
    description: "Project description",
    technologies: ["Tech1", "Tech2"],
    category: "Category",
    link: "https://project-link.com"
  },
  // Add more projects...
];
```

### Update Skills

Modify the `skills` array in `src/mock.js`:

```javascript
export const skills = [
  {
    category: "Category Name",
    items: ["Skill1", "Skill2", "Skill3"]
  },
  // Add more skill categories...
];
```

## 🛠️ Technologies Used

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **Lucide React** - Icons
- **Craco** - Create React App configuration override

### Backend
- **FastAPI** - Web framework
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation
- **Python-dotenv** - Environment variables

## 📧 Contact Form

The contact form sends messages to your MongoDB database. Messages are stored with:
- Name
- Email
- Subject
- Message
- Timestamp
- Unique ID

Messages are logged to console for monitoring.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🎨 Color Scheme

- **Primary Background**: `#0a0a0a` (Deep black)
- **Secondary Background**: `rgba(255, 255, 255, 0.05)` (Subtle white)
- **Text**: White and gray shades
- **Accent**: Pure white for buttons

## 🔧 Available Scripts

### Frontend
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Backend
- `python server.py` - Start the server
- `uvicorn server:app --reload` - Start with auto-reload

## 📦 Deployment

### Frontend (Vercel/Netlify)
1. Push to GitHub
2. Connect repository to Vercel/Netlify
3. Set build command: `npm run build`
4. Set public directory: `build`

### Backend (Heroku/Railway/Render)
1. Push to GitHub
2. Connect repository to your hosting platform
3. Set Python version: 3.9+
4. Set environment variables (MONGO_URL, DB_NAME, CORS_ORIGINS)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📞 Contact

For questions or suggestions, reach out through the contact form or email.

---

**Last Updated**: January 2025
