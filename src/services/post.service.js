import * as PostModel from "../models/post.model.js"

export const allPosts = async () => {
    try {
        return await PostModel.getAllPosts() 
    }catch(error){
        
    }
}