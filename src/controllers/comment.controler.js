import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

function createComment(req, res){
    const {content} = req.body;
    const {postId} = req.params;
    const userId = req.user?.id || '89898989';
    //validaiton for the post Id
    const post = Post.getPostFromId(postId);
    if(!post){
        return res.status(400).json({status: false, message: 'post does not exist'})
    }
    try{
        Comment.createComment(content, userId, postId);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({status: false, error, message: 'something went wrong'})
    }
    return res.status(200).json({status: true, message: 'comment created successfully'});
}

export {createComment}