import  express  from "express";
import { createPost, deletePost, getALLPosts, getPost, updatePost, userPosts } from "./post.controller.js";
import {auth} from '../../middlewares/jwt.js';

const router = express.Router();

router.route('/all').get(getALLPosts);
router.route('/:postId').get(getPost);
router.route('/').get(userPosts);
router.route('/').post(auth, createPost);
router.route('/:postId').delete(auth, deletePost);
router.route('/:postId').put(auth, updatePost);


export default router;