
import DOMPurify from "dompurify"
import {JSDOM} from "jsdom"

export const sanatizer = async (dirtyContent) => {
    const {window}  = new JSDOM("")
    const purify = DOMPurify(window)

    const cleanContent = purify.sanitize(dirtyContent, {
        ALLOWED_TAGS: ['p', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'img', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'a', 'code', 'pre', 'div', 'blockquote'],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'height', 'width', 'style', 'class'],
        FORBID_ATTR: ['onclick', 'onerror']
    })

    return cleanContent
}

