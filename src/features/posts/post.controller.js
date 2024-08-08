import {customErrorHandler} from '../../middlewares/errorHandler.js';
import { allPosts, alterPost, createNewPost, postById, postByUser, postDelete } from './post.repository.js';

export const getALLPosts = async(req,res,next)=>{
    const resp = await allPosts();
    if (resp.success) {
        res.status(201).json({success: true, res: resp.res});
    }
    else {
         next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
   }
};

export const getPost = async(req,res,next)=>{
    let {postId} = req.params
    const resp = await postById(postId)
    if (resp.success) {
        res.status(201).json({
          success: true,
          res: resp.res,
        });
      }
    else {
         next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
   }
};

export const userPosts = async(req,res,next)=>{
    let {userId} = req.cookies;
    const resp = await postByUser(userId)
    if (resp.success) {
        res.status(201).json({
          success: true,
          res: resp.res,
        });
      }
    else {
         next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
   }
};

export const createPost = async(req,res,next)=>{
    let data = req.body;
    let {userId} = req.cookies
    const resp = await createNewPost(userId, data)
    if (resp.success) {
        res.status(201).json({
          success: true,
          msg: "Created Post successfully",
          res: resp.res,
        });
      }
    else {
         next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
   }
};

export const deletePost = async(req,res,next)=>{
    let {postId} = req.params;
    let {userId} = req.cookies;
    const resp = await postDelete(postId, userId);
    if (resp.success) {
        res.json({ success: true, msg: "post Deleted"});
    } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    } 
};

export const updatePost = async(req,res,next)=>{
    let {postId} = req.params;
    let postData = req.body;
    const resp = await alterPost(postId, postData);
    if (resp.success) {
        res.json({ success: resp.success, msg: resp.msg, user: resp.res });
    } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};