import mongoose from 'mongoose';
import User from '../models/user.js';

const register = async (req, res) => {
    try {
        console.log('=== REGISTER ENDPOINT ===');
        console.log('Register request received:', req.body);
        console.log('Content-Type:', req.headers['content-type']);
        
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            console.log('Validation failed - missing data:', { email: !!email, password: !!password });
            return res.status(400).json({
                message: "Email and password are required!",
                success: false,
            });
        }

        // Validate password length
        if (password.length < 3) {
            console.log('Password too short:', password.length);
            return res.status(400).json({
                message: "Password must be at least 3 characters long!",
                success: false,
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('Invalid email format:', email);
            return res.status(400).json({
                message: "Invalid email format!",
                success: false,
            });
        }

        console.log('Checking for existing user with email:', email);
        const user = await User.findOne({ email: email });
        console.log('Existing user check result:', user ? 'User exists' : 'User not found');
        
        if (user) {
            return res.status(409).json({
                message: "User is already present!",
                success: false,
            });
        }

        console.log('Creating new user object...');
        const newUser = new User({
            email: email.toLowerCase().trim(),
            password,
        });

        console.log('Attempting to save new user to database...');
        const savedUser = await newUser.save();
        console.log('User saved successfully with ID:', savedUser._id);
        
        res.status(201).json({
            message: "User added successfully!",
            success: true,
            userId: savedUser._id
        });

    } catch (err) {
        console.error('=== REGISTER ERROR ===');
        console.error('Error type:', err.constructor.name);
        console.error('Error message:', err.message);
        
        if (err.name === 'ValidationError') {
            const validationErrors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ 
                message: "Validation failed: " + validationErrors.join(', '), 
                success: false 
            });
        }
        
        if (err.code === 11000) {
            // Duplicate key error
            return res.status(409).json({ 
                message: "User with this email already exists!", 
                success: false 
            });
        }
        
        res.status(500).json({ 
            message: "Server error during registration", 
            success: false,
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

const login = async (req, res) => {
    try {
        console.log('Login request received:', { email: req.body.email });
        
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required!",
                success: false,
            });
        }

        const user = await User.findOne({ email: email }); 
        console.log('User lookup result:', user ? 'User found' : 'User not found');
        
        if (!user) {
            return res.status(401).json({
                message: "User not found!",
                success: false,
            });
        }

        if (user.password !== password) { 
            console.log('Password mismatch for user:', email);
            return res.status(401).json({
                message: "Incorrect password!",
                success: false,
            });
        }

        console.log('Login successful for user:', email);
        res.status(200).json({
            message: "Login successful!",
            success: true,
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: "Server error", success: false });
    }
};
const userid = async (req, res) => {
    try {
        const { email } = req.query;
        console.log('UserID request received for email:', email);

        if (!email) {
            return res.status(400).json({
                message: "Email parameter is required!",
                success: false,
            });
        }

        const user = await User.findOne({ email }); 
        console.log('User lookup result:', user ? `Found user with ID: ${user._id}` : 'User not found');
        
        if (!user) {
            return res.status(404).json({
                message: "User not found!",
                success: false,
            });
        }

        res.status(200).json({
            userid: user._id,
            success: true,
        });

    } catch (err) {
        console.error('UserID lookup error:', err);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export { register, login, userid };
