import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_PAGE_NO, DEFAULT_SIZE } from '../../constant.js';
export default class Post{
    constructor(id, image, caption, createdBy, createdAt, location, status){
        this.id = id;
        this.image = image;
        this.caption = caption;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.location = location;
        this.status = status;
    }
    static createPost(imageUrl, caption, createdBy, location, status ){
        let id = uuidv4();
        let createdAt = new Date().toString();
        const newPost = new Post(id,imageUrl, caption, createdBy, createdAt, location, status);
        posts.push(newPost);
        return newPost;
    }
    static getAllPost(filters){
        if(!filters.size) filters.size = DEFAULT_SIZE;
        if(!filters.pageNo) filters.pageNo = DEFAULT_PAGE_NO;
        let filteredPost = posts;
        if(filters.userId){
            filteredPost = filteredPost.filter((entry)=>{
                return (
                    filters.userId == entry.createdBy
                )
            })
        }
        if(filters.caption){
            filteredPost = filteredPost.filter((entry)=>{
                return (
                    filters.caption == entry.caption
                )
            })
        }
        const offSet = pageNo * size - size;
        filteredPost = filteredPost.splice(offSet,size)
        filteredPost = filteredPost.filter(()=>{

        })
        return filteredPost;
    }
    static getPostFromId(postId){
        const post = posts.find((entry)=>{
            return entry.id == postId
        })
        return post;
    }
    static deletePostFromId(postId){
        const filteredPosts = posts.filter((entry)=>{
            return entry.id != postId
        })
        posts = filteredPosts;
    }

    static updatePost(postId, body){
        const {image, caption, location, status} = body
        const post = this.getPostFromId(postId);
        post.image = image;
        post.caption = caption;
        post.location = location;
        post.status = status;
    }
}
    
let posts = [
    new Post("1", '', 'everything looks good', '1x0', 'Sat Aug 03 2024 20:39:42 GMT+0530 (India Standard Time)', 'CP Delhi', 'active'),
]