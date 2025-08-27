
const modal = document.querySelector('.generic-modal')
const title = document.querySelector('.modal-title')
const closeModalBtn = document.querySelector('#close-modal-btn')
const modalContent = document.querySelector('.modal-content')
let modalBtnAction = document.querySelector('.modal-btn-action')



export function genericModal({modalTitle, buildContent, actionBtn, modalBtnText}){
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
