# 📚 Course Enrollment Portal

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application for managing course enrollments with an admin approval system.

## ✨ Features

### For Students
- 🔐 **User Authentication** - Secure registration and login
- 📖 **Course Catalog** - Browse available courses with detailed information
- 💳 **Enrollment System** - Submit enrollment requests with transaction ID
- 📊 **Personal Dashboard** - Track enrollment status (pending/approved)
- 🔔 **Real-time Updates** - Get notified when enrollments are approved

### For Admins
- 👨‍💼 **Admin Dashboard** - Manage all enrollment requests
- ✅ **Approval System** - Review and approve/reject enrollments
- 📝 **Transaction Verification** - Verify payment transaction IDs
- 📋 **Notification Management** - Track all enrollment submissions

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Material-UI (MUI)** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📋 Prerequisites

Before running this project, make sure you have:
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kirankarlapati/Course-Enrollment-Portal.git
   cd Course-Enrollment-Portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/course-enrollment
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For Windows
   mongod
   
   # For Linux/Mac
   sudo systemctl start mongod
   ```

## 🎯 Running the Application

### Development Mode (Both Frontend & Backend)
```bash
npm run both
```

### Run Frontend Only
```bash
npm run dev
```
Frontend will run on: `http://localhost:5173`

### Run Backend Only
```bash
npm run server
```
Backend will run on: `http://localhost:5000`

## 📁 Project Structure

```
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/           # Request handlers
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── notificationController.js
│   │   ├── paymentController.js
│   │   └── userController.js
│   ├── middleware/            # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/                # Mongoose schemas
│   │   ├── Course.js
│   │   ├── Enrollment.js
│   │   ├── Notification.js
│   │   └── User.js
│   ├── routes/                # API routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── userRoutes.js
│   └── server.js              # Express app entry point
│
├── src/
│   ├── api/
│   │   └── api.js             # API client configuration
│   ├── components/            # Reusable components
│   │   ├── CourseCard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx    # Authentication context
│   ├── pages/                 # Page components
│   │   ├── AdminDashboard.jsx
│   │   ├── CourseDetails.jsx
│   │   ├── CourseList.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── PaymentSuccess.jsx
│   │   └── Register.jsx
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # React entry point
│   └── theme.js               # MUI theme configuration
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔑 Default Admin Access

To access admin features, create a user with `isAdmin: true` in MongoDB or modify the User model to set a user as admin.

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID

### Enrollments
- `POST /api/payment/check-enrollment` - Create enrollment request
- `GET /api/user/enrollments` - Get user's enrollments

### Admin
- `GET /api/admin/notifications` - Get all enrollment requests
- `PUT /api/admin/notifications/:id` - Update enrollment status

## 🎨 Features Explanation

### Enrollment Flow
1. Student browses courses and selects one
2. Student fills enrollment form with transaction ID
3. System creates enrollment with "pending" status
4. Admin reviews the submission in dashboard
5. Admin approves/rejects after verifying transaction ID
6. Student receives updated status in their dashboard

### Security
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes on frontend and backend
- Role-based access control (Admin/User)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Kiran Karlapati**
- GitHub: [@kirankarlapati](https://github.com/kirankarlapati)

## 🙏 Acknowledgments

- Material-UI for the beautiful components
- MongoDB for the flexible database
- All contributors who help improve this project

---

Made with ❤️ using MERN Stack
