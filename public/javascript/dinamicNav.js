const hambutton = document.querySelector('.hambutton')
const dropdownBtn = document.querySelector('.dropbtn')
const dropdownContent = document.querySelector('.dropdown-content')

hambutton.addEventListener("click", (e) => {
    e.preventDefault()
    hambutton.classList.toggle('open')
})

dropdownBtn.addEventListener("click", (e) => {
    e.preventDefault()
    dropdownContent.classList.toggle('open')
})

document.addEventListener("click", (e) => {
  if (!dropdownContent.contains(e.target) && e.target !== dropdownBtn) {
    dropdownContent.classList.remove("open");
  }
});
