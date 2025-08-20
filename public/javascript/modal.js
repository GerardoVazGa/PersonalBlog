const passwordModal = document.querySelector('#passwordModal')
const modifyBtn = document.querySelector('#modifyBtn')

modifyBtn.addEventListener('click', (e) => {
    e.preventDefault()
    passwordModal.classList.toggle('open')
})
