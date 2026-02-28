/**
 * Upload Controller
 * Maneja las peticiones de upload de archivos
 */

import * as UploadService from '../services/upload.service.js'

export const uploadTempFile = async (req, res) => {
    try {
        const result = UploadService.handleTempFileUpload(req.file)
        res.status(200).json({ url: result.url })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
