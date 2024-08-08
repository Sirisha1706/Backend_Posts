import { addComment, alterComment, getAllComments, removeComment } from "./comments.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";

export const createComment= async(req, res, next)=>{
    let {postId} = req.params;
    let data = req.body;
    let {userId} = req.cookies
    const resp = await addComment(postId, data, userId)
    if (resp.success) {
        res.status(201).json({
          success: true, msg: "Created Post successfully",
          res: resp.res,
        });
      }
    else {
         next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
   }
};

export const getComments = async(req, res, next)=>{
    let {postId} = req.params
    const resp = await getAllComments(postId);
    if (resp.success) {
        res.status(201).json({success: true, res: resp.res,});
      }
    else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
   }
};

export const updateComment = async(req, res, next)=>{
    let {commentId} = req.params;
    let commentData = req.body;
    let {userId} = req.cookies
    const resp = await alterComment(commentId, commentData, userId);
    if (resp.success) {
        res.json({ success: resp.success, msg: resp.msg, user: resp.res });
    } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};

export const deleteComment = async(req, res, next)=>{
    let {commentId} = req.params;
    let {userId} = req.cookies
    const resp = await removeComment(commentId, userId);
    if (resp.success) {
        res.json({ success: true, msg: "post Deleted"});
    } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};