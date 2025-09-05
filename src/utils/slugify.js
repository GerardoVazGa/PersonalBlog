export const slugify = async (textTitle) => {
    const slug = textTitle
        .toString()
        .toLowerCase()
        .normalize("NFD")                 
        .replace(/[\u0300-\u036f]/g, "")  
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
    
    return slug
}