# Portfolio Site Setup Guide

## Quick Start Instructions

### Step 1: Update Your Personal Information

Open `src/mock.js` and update these fields with your actual information:

```javascript
export const personalInfo = {
  name: "Aravinda Amarasingha",  // ← Change to your name
  title: "Full Stack Developer | Java Specialist",  // ← Your title
  tagline: "Building Strong Fundamentals in Java, Databases & Backend Development",  // ← Your tagline
  about: "I'm a dedicated software engineer...",  // ← Your bio
  email: "your.email@example.com",  // ← Your email
  github: "https://github.com/yourusername",  // ← Your GitHub URL
  linkedin: "https://linkedin.com/in/yourusername"  // ← Your LinkedIn URL
};
```

### Step 2: Update Your Projects

In `src/mock.js`, modify the `projects` array:

```javascript
export const projects = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Detailed description of what your project does",
    technologies: ["JavaScript", "React", "MongoDB"],
    category: "Full Stack",
    link: "https://your-project-link.com"
  },
  // Add more projects...
];
```

### Step 3: Update Your Skills

In `src/mock.js`, modify the `skills` array:

```javascript
export const skills = [
  {
    category: "Languages",
    items: ["Java", "Python", "JavaScript", "SQL"]
  },
  {
    category: "Frontend",
    items: ["React", "HTML", "CSS", "Tailwind CSS"]
  },
  // Add more skill categories...
];
```

### Step 4: Set Up Backend (Optional - for contact form)

If you want contact form functionality:

1. Create a MongoDB cluster at https://www.mongodb.com/cloud/atlas
2. Create a `.env` file in the `backend/` folder:
```
MONGO_URL=mongodb+srv://your_username:your_password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=portfolio
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

4. Run the backend:
```bash
python server.py
```

### Step 5: Run Frontend

```bash
cd frontend
npm install
npm start
```

Visit `http://localhost:3000`

## 📝 What Was Added/Enhanced

✅ **Mobile Navigation** - Hamburger menu for mobile devices
✅ **Contact Form** - Functional form with validation
✅ **Backend Integration** - Contact messages saved to MongoDB
✅ **Better Animations** - Smooth transitions and hover effects
✅ **Updated Mock Data** - Better descriptions and more skills
✅ **Professional UI** - Enhanced styling and layout

## 🎯 Next Steps

1. **Customize Colors**: Edit Tailwind classes in `src/pages/Home.jsx`
2. **Add More Projects**: Update `src/mock.js` with your real projects
3. **Add Project Links**: Update the `link` field in projects array
4. **Deploy to Production**: 
   - Frontend → Vercel, Netlify, or GitHub Pages
   - Backend → Heroku, Railway, or Render

## 📧 Contact Form Setup

The contact form automatically:
- Validates email format
- Checks for required fields
- Shows success/error messages
- Stores messages in MongoDB
- Logs submissions on the backend

## 🎨 Customization Tips

### Change Colors
Edit the hex color values in `src/pages/Home.jsx`:
- `bg-[#0a0a0a]` - Main background
- `white` - Primary text color
- `gray-300` - Secondary text color

### Change Fonts
The site uses system fonts. To add custom fonts:
1. Add to `src/index.css`
2. Update font families in Tailwind config

### Add More Sections
Copy any section in `Home.jsx` and modify for new content:
- Experience/Timeline
- Testimonials
- Blog Posts
- Resume Download

## ❓ FAQ

**Q: Can I customize the design?**
A: Yes! All styling uses Tailwind CSS classes that are easy to modify.

**Q: How do I add project screenshots?**
A: Create an `images/` folder in `public/` and reference them in your projects.

**Q: How do I deploy this?**
A: See the README.md file for deployment instructions for Vercel/Netlify.

**Q: What if I don't want the contact form?**
A: You can remove the `<ContactForm />` component from `src/pages/Home.jsx`.

## 🆘 Troubleshooting

**Form not submitting?**
- Check backend is running on `http://localhost:8000`
- Verify MongoDB connection string in `.env`
- Check browser console for errors

**Styling looks broken?**
- Run `npm install` to ensure all dependencies are installed
- Clear browser cache (Ctrl+Shift+Delete)
- Restart the dev server

**Mobile menu not working?**
- Check that `Menu` and `X` icons from lucide-react are imported
- Verify state management is working (check browser console)

## 📞 Support

If you need help:
1. Check the README.md for detailed information
2. Review the comments in the code
3. Check browser console for error messages
4. Test on a fresh terminal/shell window

---

**Your portfolio is ready to customize!** Start by updating `src/mock.js` with your personal information.
