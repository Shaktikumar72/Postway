import { v4 as uuidv4 } from 'uuid'
export default class Comment{
    constructor(id, content, createdBy, postId){
        this.id = id;
        this.content = content;
        this.createdBy = createdBy;
        this.postId = postId;
    }
    static createComment(content, userId, postId ){
        let id = uuidv4();
        const newComment = new Comment(id,content, userId, postId);
        comments.push(newComment);
    }
    static getCommentFromId(commentId){
        const comment = comments.find((entry)=>{
            return entry.id == commentId
        })
        return comment;
    }
    static deleteCommentFromId(commentId){
        const filteredComments = comments.filter((entry)=>{
            return entry.id != commentId
        })
        comments = filteredComments;
    }

    static updatePost(commentId, body){
        const {content} = body
        const comment = this.getCommentFromId(commentId);
        comment.content = content;
    }
}
    
let comments = [
]