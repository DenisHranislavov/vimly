
# Vimly

[![License](https://img.shields.io/badge/License-MIT-blue)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js-blue)](https://nextjs.org/)
[![Express.js](https://img.shields.io/badge/Backend-Express.js-brightgreen)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-blueviolet)](https://tailwindcss.com/)
[![Shadcn](https://img.shields.io/badge/UI-Shadcn-orange)](https://ui.shadcn.dev/)

Vimly is a comprehensive full-stack web application built to provide a platform with videos, articles, funny and helpful tools, and categories for organizing content. This application is powered by **Next.js** for the frontend, **Express.js** for the backend, and **MongoDB** for data management.

## 🚀 Features

- **Admin Panel**: Create, edit, and delete videos, articles, and tools.
- **Categories**: Organize content into various categories (e.g., Coding, Marketing, Lifestyle).
- **Video Section**: Information about videos (no video player).
- **Article Section**: Read articles with associated thumbnails and categories.
- **Funny & Helpful Tools**: A collection of useful and entertaining tools.
- **Authentication**: Admin login powered by **NextAuth** with token-based access.
- **Mobile Responsive**: Optimized for different screen sizes with **Tailwind CSS and Shadcn/Ui**.
- 
## 🛠️ Technologies

- **Frontend**: Next.js, Tailwind CSS, Shadcn, Lucide-React
- **Backend**: Express.js, Mongoose
- **Database**: MongoDB
- **Authentication**: NextAuth for user login and session management
- **UI Components**: Shadcn with responsive design
- **Deployment**: Hosted on **Nebula Dev Services**

## 🗂️ Project Structure

```
Vimly/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── admin/
│   │   │   │   ├── articles/
│   │   │   │   │   ├── [articleId]/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── create-article/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── categories/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── tools/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── videos/
│   │   │   │   │   ├── [videoId]/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── create-video/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts
│   │   ├── articles/
│   │   │   ├── [article]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── auth/
│   │   │   └── sign-in/
│   │   │       └── page.tsx
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   ├── tools/
│   │   │   └── page.tsx
│   │   ├── tos/
│   │   │   └── page.tsx
│   │   ├── videos/
│   │   │   ├── [videos]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── provider.tsx
│   └── public/
└── README.md

```

## 🖥️ Setup

### Prerequisites

- Node.js (v18+)
- MongoDB
- Next.js (v13+)

### Step-by-Step Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/vimly.git
```

2. Install dependencies for both backend and frontend:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Create a `.env` file for the backend:

```bash
MONGO_URI="mongodb+srv://[USERNAME]:[PASSWORD]@[GENERATED CLUSTER LINK FROM MONGO ATLAS]/vimly"
TOKEN="your-backend-token"
```

4. Run the backend:

```bash
cd backend
npm run dev
```

5. Run the frontend:

```bash
cd ../frontend
npm run dev
```

6. Visit the app at:

```
http://localhost:3000
```

## 🔑 Authentication & Token Protection

Vimly uses **NextAuth** for admin login and authentication. The environment variable `NEXT_PUBLIC_VIMLY_ADMIN_EMAIL` is used to give access to the dashboard in addition to admins stored in the database.

Ensure your token configuration is correct to restrict access to the admin panel and perform secure actions on the API.

## ⚙️ Environment Configuration

For local development, the project uses `.env` files for backend environment variables, including the MongoDB connection string, JWT secret, and NextAuth secret. Make sure to set these up before running the project:

```env
YOUTUBE_API="YOUR API KEY"
GOOGLE_CLIENT_ID = "GOOGLE CLIENT ID"
GOOGLE_CLIENT_SECRET = "GOOGLE CLIENT SECRET"
TOKEN = "YOUR TOKEN FROM THE BACKEND"
ADMIN_EMAIL = "addyouremail@example.com"
NEXT_PUBLIC_URL = "https://vimly.nebuladev.eu" ("http://localhost:3005/ by default or change it to your backend URL")

```

## 📂 API Documentation

Vimly’s backend API manages content for videos, articles, tools, admin actions. Below are the key API endpoints:

### Videos

- **GET /api/videos**: Fetch all videos
- **POST /api/videos**: Create a new video
- **DELETE /api/videos/:id**: Delete a video

### Articles

- **GET /api/articles**: Fetch all articles
- **POST /api/articles**: Create a new article
- **DELETE /api/articles/:id**: Delete an article

### Tools

- **GET /api/tools**: Fetch all tools
- **POST /api/tools**: Create a new tool
- **DELETE /api/tools/:id**: Delete a tool

## 📊 Deployment

Vimly is deployed on **Nebula Dev Services** for both the backend and frontend. Follow the Render documentation to set up the environment variables and configure your app for production.

- **Backend**: Hosted as a Node.js server on NDS.
- **Frontend**: Hosted as a Next.js app on NDS.

## 🎨 Design

The UI is built using **Shadcn** for modular components and **Tailwind CSS** for styling, offering a clean, responsive design across different devices. The admin panel features a dark/light mode toggle using **next-themes**.

## 🧑‍💻 Contributing

Feel free to submit issues or pull requests if you want to contribute to the development of Vimly.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add a new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---
# Made with <3 by Denis Hranislavov
