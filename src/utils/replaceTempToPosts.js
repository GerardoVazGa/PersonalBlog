export const replaceTempToPosts = async (cleanContent) => {
    const imageRegex = /<img[^>]+src=["']([^"']+)["']/g
    let match
    let updatedContent = cleanContent

    while ((match = imageRegex.exec(updatedContent)) !== null) {
        const src = match[1]
        if (src.includes('uploads/tempFiles/')) {
            const newUrl = await moveTempToPosts(src)
            if (newUrl) {
                updatedContent = updatedContent.replaceAll(src, newUrl)
            } else {
                await removeTemp(src)
            }
        }
    }

    return updatedContent
}