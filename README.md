# CodeTrack

A modern code tracking and leaderboard system built with Node.js and Express.

## Features

- **User Authentication**: Secure registration and login system
- **User Management**: Add, remove, and track coding usernames
- **Leaderboard System**: Maintain lists of usernames per user
- **RESTful API**: Clean API endpoints for all operations
- **MongoDB Integration**: Persistent data storage with Mongoose

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/userid` - Get user ID by email

### User Management
- `POST /api/user/add` - Add username to user's list
- `POST /api/user/remove` - Remove username from user's list
- `GET /api/user/fetchusernames` - Fetch all usernames for a user

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
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

## Project Structure

```
CodeTrack/
├── controller/
│   ├── authcontroller.js    # Authentication logic
│   └── user_controller.js   # User management logic
├── models/
│   ├── user.js             # User schema
│   └── list.js             # Username list schema
├── routes/
│   ├── auth_routes.js      # Authentication routes
│   └── user_routes.js      # User management routes
├── server.js               # Main server file
├── package.json            # Project dependencies
└── README.md              # Project documentation
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## License

MIT License - feel free to use this project for your own purposes.
