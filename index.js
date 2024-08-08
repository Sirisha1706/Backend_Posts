import express from 'express';
import { connectDb } from './db.config.js';
import userRouter from './src/features/user/user.router.js';
import postRouter from './src/features/posts/post.router.js';
import commentsRouter from './src/features/comments/comments.router.js';
import likesRouter from './src/features/likes/likes.router.js';
import cookieParser from 'cookie-parser';

const server = express();
server.use(cookieParser());
server.use(express.json())

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);
server.use('/api/comments', commentsRouter);
server.use('/api/likes', likesRouter);

server.listen(3000, ()=>{
    console.log('Server listening on port 3000.')
    connectDb();
})