import { postsModel } from "../posts/post.schema.js";
import { commentModel } from "./comments.schema.js";

export const addComment = async(postId, data, userId) => {
    try{
        let newComment = new commentModel({...data, user:userId, post:postId});
        newComment.save();
        let post = await postsModel.findById(postId);
        post.comments.push(newComment);
        post.save();
        return { success: true, res: newComment};
    }
    catch(err){
        return { success: false, error: { statusCode: 400, msg: err }};
    }
};

export const getAllComments = async(postId)=>{
    try{
        let comments = await commentModel.find({post: postId})
        if(comments) return {success: true, res: comments}
        else return {success: false, error:{statusCode: 404, msg: 'no Comments found'}}
    }
    catch(err){
        return { success: false, error: { statusCode: 400, msg: err }};
    }
};

export const alterComment = async(commentId, data, userId)=>{
    try{
        let commentUpdate = await commentModel.findOneAndUpdate({_id:commentId, user: userId}, data, {new:true})
        if(commentUpdate){
          return { success: true, res: commentUpdate};
        }
        else return { success: false, error: { statusCode: 404, msg: "Comment not found" }};
      }
      catch(err){
        return { success: false, error: { statusCode: 400, msg: err }};
      }
};

export const removeComment = async(commentId, userId)=>{
    try{
        let comment = await commentModel.findById(commentId);
        if(!comment) return { success: false, error: { statusCode: 404, msg: "Comment not found" }};
        let Post = await postsModel.findById(comment.post);
        console.log(Post)
        if(comment.user.toString() != userId || Post.user.toString() != userId) return { success: false, error: { statusCode: 404, msg: "Not authorized to delete this comment." }};
        await postsModel.findByIdAndUpdate(comment.post, {$pull: {comments: commentId}})
        await commentModel.findByIdAndDelete(commentId);
        return {success: true}
    }
    catch(err) {return { success: false, error: { statusCode: 400, msg: err }};}
}