import Post from "../models/post.model.js";
import User from "../models/user.model.js";
// import { logger } from "../middlewares/custom_logger.js";
import { winstonLogger } from "../../winston.logger.js";

function getPosts(req, res){
    const filters = req.query;
    let allPosts = [];
    try{
        allPosts = Post.getAllPost(filters);
    }
    catch(error){
        return res.status(500).json({status: false, error, message: 'something went wrong'})
    }
    return res.status(200).json({status: true, data: allPosts});
}

function createPost(req, res){
    const {caption, location, status} = req.body;
    const userId = req.user?.id || '89898989';
    try{
        Post.createPost('', caption, userId, location, status);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({status: false, error, message: 'something went wrong'})
    }
    return res.status(200).json({status: true, message: 'post created successfully'});
}

export {getPosts, createPost}