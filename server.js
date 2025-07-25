import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import authRouter from './routes/auth_routes.js';
import userRouter from './routes/user_routes.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

const uri = process.env.MONGO_URI || 'mongodb+srv://CodeTrack:qlvonOtyy8pnqK6n@codetrack.jiuaqby.mongodb.net/';

// Add connection event listeners
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
});

mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        console.log('Database:', mongoose.connection.db.databaseName);
        console.log('Connection URI:', uri.replace(/:[^:@]*@/, ':****@')); // Hide password in logs
        console.log('Models loaded: User, List');
    })
    .catch(err => {
        console.error('MongoDB Atlas connection error:', err);
        console.error('Check your internet connection and MongoDB Atlas status');
        process.exit(1);
    });

app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
);

app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log('Request body:', req.body);
    next();
});

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        message: 'Internal server error', 
        error: err.message,
        success: false 
    });
});

app.use("/api/auth", authRouter);  
app.use("/api/user", userRouter);

// Add root route handler
app.get('/', (req, res) => {
    res.json({
        message: 'CodeTrack Backend API',
        status: 'Running',
        version: '1.0.0',
        endpoints: {
            auth: {
                register: 'POST /api/auth/register',
                login: 'POST /api/auth/login',
                userid: 'GET /api/auth/userid'
            },
            user: {
                add: 'POST /api/user/add',
                remove: 'POST /api/user/remove',
                fetchusernames: 'GET /api/user/fetchusernames'
            },
            health: 'GET /health'
        },
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'CodeTrack Server',
        timestamp: new Date().toISOString()
    });
});

// Add debug route to check database status
app.get('/debug/db', async (req, res) => {
    try {
        const userCount = await mongoose.connection.db.collection('users').countDocuments();
        const listCount = await mongoose.connection.db.collection('lists').countDocuments();
        
        res.json({
            database: mongoose.connection.db.databaseName,
            uri: process.env.MONGO_URI,
            collections: {
                users: userCount,
                lists: listCount
            },
            status: mongoose.connection.readyState,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
            database: mongoose.connection.db?.databaseName || 'Not connected'
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`CodeTrack Server is running on PORT ${process.env.PORT}`);
});
