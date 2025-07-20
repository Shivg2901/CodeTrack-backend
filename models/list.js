import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    userid: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true,
        ref: 'User'
    }, 
    usernames: [{
        type: String, 
        required: true,
        trim: true
    }]
}, {
    timestamps: true,
    collection: 'lists'
});

// Check if model already exists before creating it
const List = mongoose.models.List || mongoose.model('List', listSchema);

export default List;
