export const toDeleteOldImageCont = async (oldContent, newContent) => {

    const oldImageUrls = extractImageUrls(oldContent)
    const newImageUrls = extractImageUrls(newContent)

    const imagesToDelete = oldImageUrls.filter(url => !newImageUrls.includes(url))

    return imagesToDelete
}

const extractImageUrls = (content) => {
    const imageRegex = /<img[^>]+src=["']([^"']+)["']/g
    const urls = []
    let match
    while((match = imageRegex.exec(content)) !== null){
        urls.push(match[1])
    }

    return urls
}