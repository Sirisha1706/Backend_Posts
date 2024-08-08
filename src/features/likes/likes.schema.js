import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    itemName :{
        type: String,
        required: true,
        enum: ['post', 'comment']
    },
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        requirde: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

export const likeModel = mongoose.model('likes', likeSchema);