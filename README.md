# Subscription Tracker

A beautiful full-stack subscription management application with a Node.js/Express backend and React frontend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB connection string
- npm or yarn

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   - Backend environment is already configured in `.env.development.local`
   - Make sure your MongoDB connection string is correct

### Running the Application

#### Option 1: Run Both Backend and Frontend Together (Recommended)
```bash
npm run dev:both
```
This will start:
- Backend server on `http://localhost:5500`
- Frontend React app on `http://localhost:3000`

#### Option 2: Run Separately

**Backend only:**
```bash
npm run dev
```

**Frontend only:**
```bash
npm run frontend
```

## 📁 Project Structure

```
subscription-tracker/
├── backend files (root directory)
│   ├── app.js                 # Express server
│   ├── routes/               # API routes
│   ├── controllers/          # Route controllers
│   ├── models/              # MongoDB models
│   ├── middlewares/         # Custom middlewares
│   └── config/              # Configuration files
│
└── frontend/                # React application
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/          # Page components
    │   ├── contexts/       # React contexts
    │   ├── services/       # API services
    │   └── styles/         # CSS files
    └── public/             # Static files
```

## 🎨 Features

### Backend API
- **Authentication:** JWT-based auth with bcrypt password hashing
- **Subscriptions:** Full CRUD operations for subscription management
- **Users:** User profile management
- **Security:** CORS enabled, error handling middleware

### Frontend UI
- **Beautiful Design:** Black, pink, and white theme with dark/light mode
- **Responsive:** Mobile-first design that works on all devices
- **Interactive:** Smooth animations and transitions
- **Dashboard:** Overview of subscriptions and spending analytics
- **Charts:** Visual spending analytics with Recharts
- **Forms:** Intuitive subscription management forms

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start backend in development mode |
| `npm run start` | Start backend in production mode |
| `npm run frontend` | Start frontend development server |
| `npm run dev:both` | Start both backend and frontend |
| `npm run install:all` | Install dependencies for both backend and frontend |
| `npm run frontend:build` | Build frontend for production |

## 🌐 API Endpoints

### Authentication
- `POST /api/v1/auth/sign-up` - Register new user
- `POST /api/v1/auth/sign-in` - Login user
- `POST /api/v1/auth/log-out` - Logout user

### Subscriptions
- `GET /api/v1/subscriptions` - Get all subscriptions
- `POST /api/v1/subscriptions` - Create new subscription
- `GET /api/v1/subscriptions/:id` - Get subscription by ID
- `PUT /api/v1/subscriptions/:id` - Update subscription
- `DELETE /api/v1/subscriptions/:id` - Delete subscription

### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

## 🎯 Usage

1. **Register/Login:** Create an account or sign in
2. **Add Subscriptions:** Use the "Add Subscription" form to track your services
3. **View Dashboard:** See overview of your spending and upcoming renewals
4. **Manage Subscriptions:** Edit, pause, or cancel subscriptions
5. **Analytics:** View detailed spending analytics and trends
6. **Profile:** Manage your account settings and preferences

## 🔒 Environment Variables

Backend (`.env.development.local`):
```
PORT=5500
NODE_ENV=development
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

## 🚀 Deployment

### Backend
- Deploy to services like Heroku, Railway, or DigitalOcean
- Set production environment variables
- Ensure MongoDB connection is accessible

### Frontend
- Build with `npm run frontend:build`
- Deploy to Netlify, Vercel, or similar services
- Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.