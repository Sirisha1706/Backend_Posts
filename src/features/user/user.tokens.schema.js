import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

export const tokenModel = mongoose.model('tokens', tokenSchema);