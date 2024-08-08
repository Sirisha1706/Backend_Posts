import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true 
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }],
    likes:{
        type: Number,
        default: 0
    }
});

export const postsModel = mongoose.model('posts', postSchema);