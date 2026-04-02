class CommentsSection {
    constructor() {
        this.commentsContainer = document.getElementById('comments')
        this.commentsForm = document.getElementById('comments-form')
    }

    init() {
        if(!this.commentsContainer || !this.commentsForm) return

        this.commentsForm.addEventListener("submit", (e) => this.handleSubmit(e))

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
                console.log("hello")
                this.commentsForm.reset()
            }
        } catch (error) {
            console.error('Error submitting comment:', error)
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const commentsSection = new CommentsSection()
    commentsSection.init()
})
