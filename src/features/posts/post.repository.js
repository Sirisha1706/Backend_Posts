import { userModel } from '../user/user.schema.js';
import {postsModel} from './post.schema.js';

export const allPosts = async()=>{
    try{
        const posts = await postsModel.find();
        if(posts) return { success: true, res: posts};
        else return { success: false, error: { statusCode: 404, msg: "posts not found" }};
    }
    catch(err){
        return { success: false, error: { statusCode: 400, msg: err }};
    }
};

export const createNewPost = async(userId, postData)=>{
    try{
        let newPost = new postsModel({...postData, user: userId});
        newPost.save();
        let user = await userModel.findById(userId);
        user.posts.push(newPost);
        user.save();
        return { success: true, res: newPost};
    }
    catch(err){
        return { success: false, error: { statusCode: 400, msg: err }};
    }
}

export const alterPost = async(postId, data)=>{
    try{
        let updatePost = await postsModel.findByIdAndUpdate(postId, data, {new:true})
        if(updatePost){
          return { success: true, res: updatePost};
        }
        else return { success: false, error: { statusCode: 404, msg: "Post not found" }};
      }
      catch(err){
        return { success: false, error: { statusCode: 400, msg: err }};
      }
}

export const postDelete = async(postId, userId)=>{
    try{
        await userModel.findByIdAndUpdate(userId, {$pull: {posts: postId}})
        let post = await postsModel.findById(postId);
        if(!post) return {success: false, error: {statusCode: 404, msg: 'Post not found'}}
        if(post.user.toString() != userId) return {success: false, error:{statusCode: 403, msg: "User not authorized to delete this post"}}
        await postsModel.findByIdAndDelete(postId);
        return {success: true}
    }
    catch(err) {return { success: false, error: { statusCode: 400, msg: err }};}
}

export const postByUser = async(userId)=>{
    try{
        let posts = await postsModel.find({user: userId})
        if(posts) return {success: true, res: posts}
        else return {success: false, error:{statusCode: 404, msg: 'Posts not found'}}
    }
    catch(err){
        return { success: false, error: { statusCode: 400, msg: err }};
    }
}

export const postById = async(postId)=>{
    try{
        let post = await postsModel.findById(postId)
        if(post) return {success: true, res: post}
        else return {success: false, error:{statusCode: 404, msg: 'Posts not found'}}
    }
    catch(err){
        return { success: false, error: { statusCode: 400, msg: err }};
    }
}