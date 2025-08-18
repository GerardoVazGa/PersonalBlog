const hambutton = document.querySelector('.hambutton')

hambutton.addEventListener("click", (e) => {
    e.preventDefault()
    hambutton.classList.toggle('open')
})