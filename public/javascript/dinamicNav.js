const hambutton = document.querySelector('.hambutton')
const dropdownBtn = document.querySelector('.dropbtn')
const dropdownContent = document.querySelector('.dropdown-content')
const mobileNav = document.querySelector('.mobile-nav')
const categoryBtn = document.querySelector('.nav-item.category-btn-container')
const categoriesDropdown = document.querySelector('.category-dropdown')
const arrowIcon = document.querySelector('.fa-solid.fa-caret-down')

hambutton.addEventListener("click", (e) => {
    e.preventDefault()
    hambutton.classList.toggle('open')
    mobileNav.classList.toggle('active')
})

dropdownBtn.addEventListener("click", (e) => {
    e.preventDefault()
    dropdownContent.classList.toggle('open')
})

if(mobileNav) {
  categoryBtn.addEventListener("click", (e) => {
    e.preventDefault()
    categoriesDropdown.classList.toggle("open");
    arrowIcon.classList.toggle("rotate")
  });
}

document.addEventListener("click", (e) => {
  if (!dropdownContent.contains(e.target) && e.target !== dropdownBtn) {
    dropdownContent.classList.remove("open");
  }
});
