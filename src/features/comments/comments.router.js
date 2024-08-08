import express from 'express';
import { createComment, deleteComment, getComments, updateComment } from './comments.controller.js';
import {auth} from '../../middlewares/jwt.js'

const router = express.Router();

router.route('/:postId').get(getComments);
router.route('/:postId').post(auth, createComment);
router.route('/:commentId').delete(auth, deleteComment);
router.route('/:commentId').put(auth, updateComment);

export default router;