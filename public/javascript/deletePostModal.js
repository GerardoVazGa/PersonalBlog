import {showModal} from "./modal.js"

// Delete Post Modal
const deletePostButtons = document.querySelectorAll('.btn-delete')

if(deletePostButtons) {
    deletePostButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const postId = button.getAttribute('data-post-id')

            showModal({
                size: "small",
                content: (content) => {
                    const message = document.createElement('p')
                    message.classList.add('delete-message')
                    message.textContent = "¿Estás seguro de que deseas eliminar esta publicación?"
                    content.appendChild(message)
                },
                buttonText: "Eliminar",
                showCancel: true,
                onAction: async () => {
                    try {
                        const response = await fetch(`/posts/delete/${postId}`, {
                            method: "Delete",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })

                        const data = await response.json()

                        if(data.success) {
                            setTimeout(() => {
                                window.location.reload()
                            }, 2000)
                        } else {
                            alert('Error deleting post: ' + data.message)
                        }
                    } catch (error) {
                        console.error('Error deleting post:', error.message)
                        alert('Error deleting post: ' + error.message)
                    }
                } 
            })
        })
    })
}

