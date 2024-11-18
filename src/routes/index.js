import express from 'express';
import { auth} from '../middlewares/auth.js';
import userRoutes from './user.routes.js';
import postRoutes from './post.routes.js';

const router =  express.Router()

router.get('/', (req, res)=>{return res})
router.use('/user', userRoutes);
router.use('/post', auth, postRoutes)

export default router;