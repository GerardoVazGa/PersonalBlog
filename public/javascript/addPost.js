const addPostButton = document.querySelector('.add-post-btn')
const addPostModal = document.querySelector('.add-post-modal')
const closeModalButton = document.querySelector('.close-modal-add-post')
const submitAddPostButton = document.querySelector('.submit-add-post')

if(addPostButton) {
    addPostButton.addEventListener('click', (e) => {
        e.preventDefault()
        addPostModal.style.display = 'flex'
    })
}

if(closeModalButton) {
    closeModalButton.addEventListener('click', (e) => {
        e.preventDefault()
        addPostModal.style.display = 'none'
    })
}

