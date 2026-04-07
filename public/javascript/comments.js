class CommentsSection {
    constructor() {
        this.commentsContainer = document.getElementById('comments')
        this.commentsForm = document.getElementById('comments-form')
        this.commentsBox = document.getElementById('comments-box')
        this.commentsCounter = document.getElementById('comment-count') 
        this.replyFormContanier = null
    }

    init() {
        if(!this.commentsContainer || !this.commentsForm) return

        this.commentsForm.addEventListener("submit", (e) => this.handleSubmit(e))

        this.getComments()

        this.commentsBox.addEventListener('click', (e) => this.handleActionButtons(e))
    }

    handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(this.commentsForm)

        const commentData = {
            postId: this.commentsContainer.dataset.postId,
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

        this.commentsCounter.textContent = this.countComments(comments)
        this.commentsBox.appendChild(fragment)
    }

    createCommentElement(comment){
        const commentItem = document.createElement('div')
        commentItem.classList.add('comment-item')
        commentItem.dataset.commentId = comment.id

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

        const likeBtn = this.createButton('👍', comment.likes, 'like')
        const replyBtn = this.createButton('💬', 'Responder', 'reply')
        const reportBtn = this.createButton('🚩', 'Reportar', 'report')

        actions.append(likeBtn, replyBtn, reportBtn)

        // Append main content
        content.append(header, text, actions)

        // Replies
        if(comment.replies && comment.replies.length > 0) {
            const repliesContainer = document.createElement('div')
            repliesContainer.classList.add('comments-replies')
            comment.replies.forEach(reply => {
                const replyItem = this.createReplyItem(reply)
                repliesContainer.appendChild(replyItem)
            })

            content.appendChild(repliesContainer)
        }


        commentItem.append(avatar, content)

        return commentItem

    }

    getInitials(name) {
        const names = name.split(' ')
        if(names.length === 0) return "?"

        return names.map(name => name[0]).join('').toUpperCase().slice(0, 2)
    }

    createButton(icon, text, action = null) {
        const btn = document.createElement('button')
        btn.classList.add('comment-action-btn')
        btn.textContent = `${icon} ${text}`
        btn.dataset.action = action
        return btn
    }

    createReplyItem(reply) {
        const replyItem = document.createElement('div')
        replyItem.classList.add('reply-item')
        replyItem.dataset.commentId = reply.id

        const avatar = document.createElement('div')
        avatar.classList.add('reply-avatar')
        avatar.textContent = this.getInitials(reply.author_name)

        const content = document.createElement('div')
        content.classList.add('comment-content')

        // Header
        const header = document.createElement('div')
        header.classList.add('comment-header')

        const author = document.createElement('span')
        author.classList.add('comment-author')
        author.textContent = reply.author_name

        const date = document.createElement('span')
        date.classList.add('comment-date')
        date.textContent = reply.created_at

        header.append(author, date)

        // Text
        const text = document.createElement('p')
        text.classList.add('comment-text')
        text.textContent = reply.content

        // Actions
        const actions = document.createElement('div')
        actions.classList.add('comment-actions')

        const likeBtn = this.createButton('👍', reply.likes, 'like')
        const replyBtn = this.createButton('💬', 'Responder', 'reply')
        const reportBtn = this.createButton('🚩', 'Reportar', 'report')

        actions.append(likeBtn, replyBtn, reportBtn)

        content.append(header, text, actions)

        replyItem.append(avatar, content)

        return replyItem
    }

    showReplyForm(commentId, commentItem) {
        this.closeReplyForm()

        this.replyFormContanier = document.createElement('div')
        this.replyFormContanier.classList.add('reply-form-wrapper', 'active')

        const replyTitle = document.createElement('h4')
        replyTitle.textContent = "Responder a este comentario"

        const replyForm = document.createElement('form')
        replyForm.classList.add('reply-form')

        const replyFormGroup = document.createElement('div')
        replyFormGroup.classList.add('reply-form-group')

        const replyAuthorLabel = document.createElement('label')
        replyAuthorLabel.textContent = 'Tu Nombre'

        const replyAuthorInput = document.createElement('input')
        replyAuthorInput.type = 'text'
        replyAuthorInput.name = 'author_name'
        replyAuthorInput.required = true

        replyFormGroup.append(replyAuthorLabel, replyAuthorInput)

        const replyFormGroupTextarea = document.createElement('div')
        replyFormGroupTextarea.classList.add('reply-form-group')

        const replyTextLabel = document.createElement('label')
        replyTextLabel.textContent = 'Tu Comentario'

        const replyTextInput = document.createElement('textarea')
        replyTextInput.name = 'content'
        replyTextInput.required = true

        replyFormGroupTextarea.append(replyTextLabel, replyTextInput)

        const replyFormActions = document.createElement('div')
        replyFormActions.classList.add('reply-form-actions')

        const replySubmit = document.createElement('button')
        replySubmit.type = 'submit'
        replySubmit.textContent = 'Responder'
        replySubmit.classList.add('reply-form-submit')

        const replyCancel = document.createElement('button')
        replyCancel.type = 'button'
        replyCancel.textContent = 'Cancelar'
        replyCancel.classList.add('reply-form-cancel')

        replyFormActions.append(replySubmit, replyCancel)

        replyForm.append(replyFormGroup, replyFormGroupTextarea, replyFormActions)

        this.replyFormContanier.append(replyTitle, replyForm)

        const commentContent = commentItem.querySelector('.comment-content')

        commentContent.appendChild(this.replyFormContanier)

    }

    countComments(comments) {
        let count = 0
        comments.forEach(comment => {
            count++
            if(comment.replies && comment.replies.length > 0) {
                count += this.countComments(comment.replies)
            }
        })

        return count
    }

    closeReplyForm(){
        if(this.replyFormContanier){
            this.replyFormContanier.remove()
            this.replyFormContanier = null
        }
    }

    handleActionButtons(e){
        const btn = e.target.closest('.comment-action-btn')

        if(!btn) return

        const action = btn.dataset.action

        const commentItem = btn.closest('.comment-item, .reply-item')
        const commentId = commentItem.dataset.commentId

        switch(action){
            case 'reply':
                this.showReplyForm(commentId, commentItem)
                break
        }

    }

}

document.addEventListener("DOMContentLoaded", () => {
    const commentsSection = new CommentsSection()
    commentsSection.init()
})
