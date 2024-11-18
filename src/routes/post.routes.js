import express from 'express';
const router =  express.Router()
import {createPost, getPosts  } from '../controllers/post.controller.js';
import { createComment } from '../controllers/comment.controler.js';
router.route('/')
    .post(createPost)
    .get(getPosts) //this would also be responsible for userId post

router.route('/:postId/comment')
    .post(createComment)

router.route('/:postId/bookmark')
    .post() //userController

// router.route('/:postId')
//     .get(getPostById)
//     .put(updatePost)
//     .delete(deletePost)

export default router;
