
const modal = document.querySelector('.generic-modal')
const title = document.querySelector('.modal-title')
const closeModalBtn = document.querySelector('#close-modal-btn')
const modalContent = document.querySelector('.modal-content')
let modalBtnAction = document.querySelector('.modal-btn-action')



function genericModal({modalTitle, buildContent, actionBtn, modalBtnText}){
    modalContent.textContent = ""

    if(modalTitle){
        title.textContent = modalTitle
    }

    if(typeof buildContent === "function"){
        buildContent(modalContent)
    }

    if(modalBtnText){
        modalBtnAction.textContent = modalBtnText
    }

    const newButtonAction = modalBtnAction.cloneNode(true)
    modalBtnAction.parentNode.replaceChild(newButtonAction, modalBtnAction)
    modalBtnAction = newButtonAction

    if(actionBtn){

        newButtonAction.addEventListener("click", () =>{
            actionBtn()
            modal.classList.remove("show")
        })
    }else {
        
    }

    modal.classList.add('show')
}



if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("show")
    });
}

//Login modal

const loginBtn = document.querySelector('#loginBtn')
const logoutBtn = document.querySelector('#logoutBtn')

if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        genericModal({
            modalTitle: "Admin Login",
            buildContent: (content) => {
                const form = document.createElement("form")
                form.id = "passwordForm"
                form.classList.add("form-inputs")

                const passwordInput = document.createElement("input")
                passwordInput.id = "passwordInput"
                passwordInput.type = "password"
                passwordInput.placeholder = "Enter your password"

                form.appendChild(passwordInput)
                content.appendChild(form)
            },
            actionBtn: async () => {
                const password = document.getElementById("passwordInput").value
                try {
                    const response = await fetch('/login', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({password})
                    })

                    const data = await response.json()

                    if(data.success) {
                        setTimeout(() => {
                            window.location.reload()
                        }, 1000)
                    } else {
                        console.error('Error al iniciar sesión:', data.message)
                    }
                } catch (error) {
                    console.error('Error al iniciar sesión:', error.message)
                }
            },
            modalBtnText: "Login"
        })
    });
}

if(logoutBtn) {
    logoutBtn.addEventListener("click", logout)
}

async function logout() {
    try{
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            }
        })

        const data = await response.json()

        if(data.success) {
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } else {
            console.error('Error al cerrar sesión:', data.message)
        }
    }catch(error){
        console.error('error al cerrar sesion:', error.message)
    }
}

// Add Post Modal
const addPostButton = document.querySelector('.add-post-btn')

if(addPostButton){
    addPostButton.addEventListener('click', (e) => {
        e.preventDefault()
        genericModal({
            modalTitle: "Add New Post",
            buildContent: (content) => {
                const form = document.createElement("form")
                form.id = "form-add-post"
                form.enctype = "multipart/form-data"
                form.method = "POST"
                form.action = "/posts/add"
                form.classList.add("form-inputs")

                const titleDiv = document.createElement("div")
                const titleLabel = document.createElement("label")
                titleLabel.htmlFor = "post-title"
                titleLabel.textContent = "Title"
                const titleInput = document.createElement("input")
                titleInput.type = "text"
                titleInput.id = "post-title"
                titleInput.name = "title"
                titleInput.required = true
                titleDiv.appendChild(titleLabel)
                titleDiv.appendChild(titleInput)

                const contentDiv = document.createElement("div")
                const contentLabel = document.createElement("label")
                contentLabel.htmlFor = "post-content"
                contentLabel.textContent = "Content"
                const contentTextarea = document.createElement("textarea")
                contentTextarea.id = "post-content"
                contentTextarea.name = "content"
                contentTextarea.rows = 5
                contentTextarea.required = true
                contentDiv.appendChild(contentLabel)
                contentDiv.appendChild(contentTextarea)

                const imageDiv = document.createElement("div")
                const imageLabel = document.createElement("label")
                imageLabel.htmlFor = "post-image"
                imageLabel.textContent = "Image"
                const imageInput = document.createElement("input")
                imageInput.type = "file"
                imageInput.id = "post-image"
                imageInput.name = "image"
                imageInput.accept = "image/*"
                imageInput.required = true
                imageDiv.appendChild(imageLabel)
                imageDiv.appendChild(imageInput)

                form.appendChild(titleDiv)
                form.appendChild(contentDiv)
                form.appendChild(imageDiv)

                content.appendChild(form)
            },
            actionBtn: () => {
               document.getElementById('form-add-post').submit()
            },
            modalBtnText: "Add Post"
        })
    })
}
