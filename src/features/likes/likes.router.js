import express from 'express';
import { getLikes, toggleLikes } from './likes.controller.js';
import {auth} from '../../middlewares/jwt.js';

const router = express.Router();

router.route('/:id').get(getLikes);
router.route('/toggle/:id').post(auth, toggleLikes);


export default router;