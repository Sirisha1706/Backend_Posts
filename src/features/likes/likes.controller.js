import { addLikes, getAllLikes } from "./likes.repository.js";
import {customErrorHandler} from '../../middlewares/errorHandler.js';

export const getLikes = async(req, res, next) => {
    let {id} = req.params
    const resp = await getAllLikes(id)
    if (resp.success) {
        res.status(201).json({
          success: true,
          likes: resp.res,
        });
      }
    else {
         next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
   }
};

export const toggleLikes = async(req, res, next) => {
    let {id} = req.params;
    let {userId} = req.cookies
    const resp = await addLikes(id, userId)
    if (resp.success) {
        res.status(201).json({
          success: true,
          msg: resp.msg,
        });
      }
    else {
         next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
   }
};