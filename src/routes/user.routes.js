import express from 'express';
const router =  express.Router()
import { signup, signin, allUsers } from '../controllers/user.controler.js';


router.route('/signup')
    .post(signup)

router.route('/signin')
    .get(signin)

router.route('/')
    .get(allUsers)

export default router;
