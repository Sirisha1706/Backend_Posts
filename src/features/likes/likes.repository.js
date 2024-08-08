import { likeModel } from "./likes.schema.js";
import {commentModel} from '../comments/comments.schema.js';
import {postsModel} from '../posts/post.schema.js';

export const getAllLikes = async(id)=>{
    try{
        let likes = await likeModel.find({itemId: id})
        return {success: true, res: likes.length}
    }
    catch(err){
        return { success: false, error: { statusCode: 400, msg: err }};
    }
};

export const addLikes = async(id, userId)=>{
    try{
        let item
        let like = await likeModel.findOne({itemId: id, user: userId})
        let post = await postsModel.findById(id)
        let comment = await commentModel.findById(id)
        if(post){
            if(!like){
                item = new likeModel({itemId: id, itemName: 'post', user: userId})
                item.save()
                post.likes+=1;
                post.save();
                return { success: true, msg: 'like added to post'};
            }
            else {
                await likeModel.findOneAndDelete({itemId: id})
                post.likes-=1
                post.save();
                return { success: true, msg: 'like removed.'};
            }
        }
        if(comment){ 
            if(!like){
                item = new likeModel({itemId: id, itemName: 'comment', user: userId})
                item.save()
                comment.likes+=1;
                comment.save();
                return { success: true, msg: 'like added to comment'};
            }
            else {
                await likeModel.findOneAndDelete({itemId: id})
                comment.likes-=1
                comment.save();
                return { success: true, msg: 'like removed.'};
            }
        }
        return { success: false, error: { statusCode: 404, msg: "Incorrect Id." }};
    }
    catch(err){
        return { success: false, error: { statusCode: 400, msg: err }};
      }
};