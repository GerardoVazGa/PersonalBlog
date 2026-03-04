document.addEventListener('DOMContentLoaded', () => {
    const addPostButton = document.querySelector('.add-post-btn')

    if (addPostButton) {
        addPostButton.addEventListener('click', (e) => {
            e.preventDefault()
            window.location.href = '/create-post'
        })
    }
})