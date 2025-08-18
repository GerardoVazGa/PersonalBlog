const hambutton = document.querySelector('.hambutton')
const dropdownBtn = document.querySelector('.dropbtn')
const navLinks = document.querySelectorAll('.nav-links a')

hambutton.addEventListener("click", (e) => {
    e.preventDefault()
    hambutton.classList.toggle('open')
})

dropdownBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const dropdownContent = document.querySelector('.dropdown-content')

    dropdownContent.classList.toggle('active')
})

navLinks.forEach(navLink => {
    navLink.addEventListener('click', e => {
        navLinks.forEach(link => link.classList.remove('active'))
        navLink.classList.add('active')
    })
})

document.addEventListener("click", (e) => {
  const dropdownContent = document.querySelector('.dropdown-content')
  if (!dropdownContent.contains(e.target) && e.target !== dropdownBtn) {
    dropdownContent.classList.remove("active");
  }
});
