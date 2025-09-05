import * as PostModel from "../models/post.model.js"
export const slugify = async (textTitle) => {
    const firstSlug = textTitle
        .toString()
        .toLowerCase()
        .normalize("NFD")                 
        .replace(/[\u0300-\u036f]/g, "")  
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
    
    let slug = firstSlug
    let count = 1

    while(await PostModel.existSlug(slug)) slug = `${firstSlug}-${count++}`
    
    return slug
}