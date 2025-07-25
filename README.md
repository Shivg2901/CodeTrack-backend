# CodeTrack Backend

A modern code tracking and leaderboard system built with Node.js and Express.

## Features

- **User Authentication**: Secure registration and login system
- **User Management**: Add, remove, and track coding usernames
- **Leaderboard System**: Maintain lists of usernames per user
- **RESTful API**: Clean API endpoints for all operations
- **MongoDB Integration**: Persistent data storage with Mongoose
- **Feedback Submission**: Accept user feedback via API

## API Endpoints

**Base URL**: `https://codetrack-backend-9val.onrender.com`

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
- MongoDB Atlas account (cloud database)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGO_URI=mongodb+srv://CodeTrack:qlvonOtyy8pnqK6n@codetrack.jiuaqby.mongodb.net/
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## Deployment

The backend is deployed on **Render** at: `https://codetrack-backend-9val.onrender.com`

### Environment Variables (Production)
- `MONGO_URI`: MongoDB Atlas connection string
- `PORT`: Automatically set by Render

## Database Configuration

This project uses **MongoDB Atlas** (cloud database) instead of local MongoDB.

### MongoDB Atlas Setup

The application is pre-configured to connect to a MongoDB Atlas cluster:
- **Cluster**: CodeTrack
- **Database**: Will be automatically created
- **Collections**: `users` and `lists` will be created automatically

### Connection Details
- The connection string includes authentication credentials
- No additional setup required - the database is ready to use
- The application will automatically create collections as needed

## Troubleshooting

### MongoDB Connection Issues

If you encounter connection issues:

1. **Internet Connection**: Ensure you have a stable internet connection
2. **Atlas Status**: Check if MongoDB Atlas service is operational
3. **IP Whitelist**: The cluster is configured to allow all IPs (0.0.0.0/0)
4. **Credentials**: The connection string includes embedded credentials

### Local Development
- No local MongoDB installation required
- All data is stored in the cloud Atlas cluster
- Multiple developers can share the same database instance

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
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## License

MIT License - feel free to use this project for your own purposes.
