class CommentsSection {
    constructor() {
        this.commentsContainer = document.getElementById('comments')
        this.commentsForm = document.getElementById('comments-form')
        this.commentsBox = document.getElementById('comments-box')
    }

    init() {
        if(!this.commentsContainer || !this.commentsForm) return

        this.commentsForm.addEventListener("submit", (e) => this.handleSubmit(e))

        this.getComments()
    }

    handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(this.commentsForm)

        const commentData = {
            postId: this.commentsContainer.getAttribute('postId'),
            authorName: formData.get('author_name').trim(),
            content: formData.get('content').trim()
        }

        this.submitComment(commentData)
    }

    async submitComment(commentData) {
        try {
            const response = await fetch(`/api/post/${commentData.postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commentData)
            })

            if(response.ok){
                this.commentsForm.reset()
            }
        } catch (error) {
            console.error('Error submitting comment:', error)
        }
    }
    
    async getComments(){
        const postId = this.commentsContainer.dataset.postId

        try {
            const response = await fetch(`/api/post/${postId}/comments`)
            if(response.ok){
                const comments = await response.json()
                this.renderComments(comments)
            }
        } catch(error) {
            console.error('Error fetching comments: ', error)
        } 
    }

    renderComments(comments){
        this.commentsBox.innerHTML = ""
        const fragment = document.createDocumentFragment()
        comments.forEach(comment => {
            const commentElement = this.createCommentElement(comment)
            fragment.appendChild(commentElement)
        })

        this.commentsBox.appendChild(fragment)
    }

    createCommentElement(comment){
        const commentItem = document.createElement('div')
        commentItem.classList.add('comment-item')

        // Avatar
        const avatar = document.createElement('div')
        avatar.classList.add('comment-avatar')
        avatar.textContent = this.getInitials(comment.author_name)

        // Content
        const content = document.createElement('div')
        content.classList.add('comment-content')

        // Header
        const header = document.createElement('div')
        header.classList.add('comment-header')

        const author = document.createElement('span')
        author.classList.add('comment-author')
        author.textContent = comment.author_name

        const date = document.createElement('span')
        date.classList.add('comment-date')
        date.textContent = comment.created_at

        header.append(author, date)

        // Text
        const text = document.createElement('p')
        text.classList.add('comment-text')
        text.textContent = comment.content

        // Actions
        const actions = document.createElement('div')
        actions.classList.add('comment-actions')

        const likeBtn = this.createButton('👍', comment.likes)
        const replyBtn = this.createButton('💬', 'Responder')
        const reportBtn = this.createButton('🚩', 'Reportar')

        actions.append(likeBtn, replyBtn, reportBtn)

        // Append main content
        content.append(header, text, actions)

        commentItem.append(avatar, content)

        return commentItem

    }

    getInitials(name) {
        const names = name.split('')
        if(names.length === 0) return "?"

        return names.map(name => name[0]).join('').toUpperCase().slice(0, 2)
    }

    createButton(icon, text) {
        const btn = document.createElement('button')
        btn.classList.add('comment-action-btn')
        btn.textContent = `${icon} ${text}`
        return btn
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const commentsSection = new CommentsSection()
    commentsSection.init()
})
