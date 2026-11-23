# Lead Manager – MERN Stack Application

A full-stack Lead Management System built using MongoDB, Express.js, React.js, and Node.js (MERN Stack). This application allows users to securely manage their leads with authentication and CRUD functionality.

## 🚀 Features

- User Signup and Login
- Secure authentication using JWT and HttpOnly cookies
- User-specific lead management
- Create, Read, Update, and Delete leads
- Search leads by name
- Filter leads by status
- Lead status management
- Form validation
- Toast notifications
- Protected routes
- Responsive user interface

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Bootstrap
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Cookie-parser
- CORS

## 📁 Project Structure

```text
Lead_Manager/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Lead_Manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Use the exact MongoDB environment variable name expected by your backend code.

Start the backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## 🔐 Authentication

The application uses JWT-based authentication with HttpOnly cookies.

- Signup: Register a new account.
- Login: Authenticate using email and password.
- Protected Routes: Only authenticated users can access the dashboard.
- Logout: Clear the authentication cookie.
- User-specific access: Users can manage only their own leads.

## 📋 Lead Information

Each lead contains:

- Name
- Email
- Phone
- Company
- Source
- Status

### Lead Status

- New
- Contacted
- Qualified
- Lost

### Lead Source

- Website
- LinkedIn
- Facebook
- Referral
- Other

## 🌐 Deployment

The application can be deployed using:

| Application | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

### Production Configuration

Configure the following environment variables:

**Backend (Render):**

```env
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

## 🌐 Live Demo

**Live Application:** [Lead Manager – View Live Website](YOUR_VERCEL_FRONTEND_URL)
## 👨‍💻 Author

**Rohit**

Full Stack Developer | MERN Stack

GitHub: https://github.com/rohit45634

---

⭐ If you find this project useful, feel free to explore the repository and give it a star!
