import {showModal} from "./modal.js"

//Login modal
const loginBtn = document.querySelector('#loginBtn')
const logoutBtn = document.querySelector('#logoutBtn')

if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showModal({
            title: "Admin Login",
            size: "small",
            content: (content) => {
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
            onAction: async () => {
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
            buttonText: "Login"
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