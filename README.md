# Sanjeet Kumar Portfolio

A premium personal portfolio built with React, Vite, Tailwind CSS, Framer Motion, React Router, and Supabase.

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- React Router
- Supabase

Design Requirements:
- Clean, minimal, premium UI
- Smooth animations and transitions
- Glassmorphism + gradient theme
- Fully responsive (mobile + desktop)
- Dark mode by default
- Eye-catching landing page with animations

Pages / Sections:

1. Landing Page (Hero Section)
- Name: Sanjeet Kumar
- Title typing animation:
  "Full Stack Developer"
  "MERN Stack Developer"
  "DSA Enthusiast"
- Short tagline:
  "Building scalable web applications with modern technologies"
- Buttons:
  - View Projects
  - Download Resume
- Add animated background (particles or gradient waves)

2. About Section
- Include:
  - Location: Pune, Maharashtra, India
  - Education: B.E. Electronics & Telecommunication (2023–2027)
  - Summary:
    Passionate Full Stack Developer (MERN) with strong DSA skills and 800+ problems solved.
- Add profile image placeholder
- Animated cards

3. Skills Section
Group skills into categories:
- Languages: C++, JavaScript, SQL
- Frontend: HTML, CSS, React.js, Redux
- Backend: Node.js, Express.js
- Database: MongoDB, MySQL
- Tools: Git, GitHub, Postman, VS Code

Display:
- Animated progress bars OR skill cards
- Hover effects

4. Projects Section
Create 3 project cards with animation:

Project 1:
Myzon – E-commerce App
- MERN stack
- JWT authentication
- Cart & orders
- Responsive UI

Project 2:
Job Portal
- Role-based auth
- Job posting & tracking
- Secure APIs

Project 3:
URL Shortener
- Backend project
- Short links + redirect
- Optimized DB queries

Each card should have:
- Title
- Description
- Tech stack badges
- GitHub button
- Live demo button (placeholder)

5. Resume Section
- Show preview of resume
- Download button
- Store resume in Supabase storage

6. Contact Section
- Form fields:
  Name, Email, Message
- Save data to Supabase database
- Show success toast notification
- Include social links:
  GitHub, LinkedIn, GeeksforGeeks

7. Footer
- Copyright
- Social icons

Backend (Supabase):
- Create table: contacts (name, email, message, created_at)
- Integrate Supabase client
- Store form submissions
- Store resume in Supabase storage bucket

Extra Features:
- Smooth scrolling
- Navbar with active section highlight
- Scroll animations (Framer Motion)
- Loading animation
- SEO meta tags
- Favicon

Folder Structure:
- components/
- pages/
- assets/
- hooks/
- services/supabase.js

Also:
- Add clean reusable components
- Use modern React hooks
- Write clean, readable code

At the end:
- Provide full setup instructions
- Provide environment variables for Supabase
- Include commands to run project

Make the UI extremely attractive so it impresses recruiters instantly.

## Implemented Setup Notes

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://qpwpyfcuqxtzqulqmbaf.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_sVb8V8jdZvc4y2gDsOuG0w_HaNVysF_
VITE_SUPABASE_RESUME_BUCKET=resume
VITE_SUPABASE_RESUME_PATH=sanjeet-kumar-resume.pdf
```

### Important

- Use the Supabase publishable key in the frontend.
- Do not use the direct PostgreSQL connection string in React code.
- The PostgreSQL connection string is for server-side or admin tooling only.

### Supabase Setup

1. Run the SQL in `supabase/schema.sql` from the Supabase SQL editor.
2. Create a public storage bucket named `resume`.
3. Upload your resume PDF to the path in `VITE_SUPABASE_RESUME_PATH`.
4. Update placeholder social and project links in `src/data/portfolio.js`.

### Commands

```bash
npm install
npm run dev
npm run build
```
