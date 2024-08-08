import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    },
    likes:{
        type: Number,
        default: 0
    }
});

export const commentModel = mongoose.model('comments', commentSchema);