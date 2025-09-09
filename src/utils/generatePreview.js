export async function generatePreview (content, length = 100) {
    const withoutImages = content.replaceAll(/<img[^>]*>/g, '')

    const preview = withoutImages.replace(/<[^>]*>/g, '')

    return preview.length > length ? `${preview.substring(0, length)}...` : preview
}