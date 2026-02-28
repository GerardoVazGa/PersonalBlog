/**
 * Upload Service
 * Maneja la lógica de validación y procesamiento de archivos
 */

export const validateUpload = (file) => {
    if (!file) {
        throw new Error('File not uploaded')
    }
    return true
}

export const getUploadedFileUrl = (filename) => {
    return `/uploads/tempFiles/${filename}`
}

export const handleTempFileUpload = (file) => {
    validateUpload(file)
    const url = getUploadedFileUrl(file.filename)
    
    return {
        url,
        filename: file.filename,
        size: file.size,
        mimetype: file.mimetype
    }
}
