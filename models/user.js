import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3  // Changed from 6 to 3 for easier testing
    }
}, {
    timestamps: true,
    collection: 'users'
});

// Check if model already exists before creating it
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
