# CodeTrack

A modern code tracking and leaderboard system built with Node.js and Express.

## Features

- **User Authentication**: Secure registration and login system
- **User Management**: Add, remove, and track coding usernames
- **Leaderboard System**: Maintain lists of usernames per user
- **RESTful API**: Clean API endpoints for all operations
- **MongoDB Integration**: Persistent data storage with Mongoose
- **Feedback Submission**: Accept user feedback via API

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/userid` - Get user ID by email

### User Management
- `POST /api/user/add` - Add username to user's list
- `POST /api/user/remove` - Remove username from user's list
- `GET /api/user/fetchusernames` - Fetch all usernames for a user

### Feedback
- `POST /api/feedback/submit` - Submit feedback (name, email, message, etc.)

### Health & Debug
- `GET /health` - Health check endpoint
- `GET /debug/db` - Database status and collection counts

## Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB service:
   ```bash
   # On Windows (if MongoDB is installed as a service)
   net start MongoDB

   # Or start MongoDB manually
   mongod
   ```

4. Create a `.env` file with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/codetrack
   PORT=3000
   ```

5. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## Troubleshooting

### MongoDB Connection Issues

If you encounter connection issues with local MongoDB:

1. **MongoDB Service**: Ensure MongoDB is running:
   ```bash
   mongo --eval "db.adminCommand('ismaster')"
   ```

2. **Port**: Verify MongoDB is running on the default port (27017)

3. **Database**: The application will automatically create the `codetrack` database if it doesn't exist

### MongoDB Atlas (Alternative Setup)

If you prefer using MongoDB Atlas instead of local MongoDB:

1. **IP Whitelist**: Add your current IP address to the Atlas cluster's IP Access List
2. **Database User**: Ensure you have a database user with proper permissions
3. **Connection String**: Update your `MONGO_URI` in the `.env` file with your Atlas connection string

## Project Structure

```
CodeTrack/
├── controller/
│   ├── authcontroller.js      # Authentication logic
│   ├── user_controller.js     # User management logic
│   └── feedbackcontroller.js  # Feedback submission logic
├── models/
│   ├── user.js                # User schema
│   └── list.js                # Username list schema
├── routes/
│   ├── auth_routes.js         # Authentication routes
│   ├── user_routes.js         # User management routes
│   └── feedback_routes.js     # Feedback routes
├── server.js                  # Main server file
├── package.json               # Project dependencies
└── README.md                  # Project documentation
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (Local instance)
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## License

MIT License - feel free to use this project for your own purposes.
