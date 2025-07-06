import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    userid: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        unique: true,
        ref: 'users'
    }, 
    usernames: [
        { 
            type: String, 
            required: true 
        }
    ]
}, {
    timestamps: true
});

const List = mongoose.model("list", listSchema);

export default List;
