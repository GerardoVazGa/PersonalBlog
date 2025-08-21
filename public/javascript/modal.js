const passwordModal = document.querySelector('#passwordModal')
const loginBtn = document.querySelector('#loginBtn')
const logoutBtn = document.querySelector('#logoutBtn')
const botonSend = document.querySelector('.btnSend')
const passwordInput = document.getElementById('passwordInput')

if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        passwordModal.classList.toggle("open");
    });
}

if(logoutBtn) {
    logoutBtn.addEventListener("click", logout)
}

botonSend.addEventListener("click", checkPassword)



async function checkPassword() {
    

    try {
        const password = passwordInput.value

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({password})
        })

        const data = await response.json()

        console.log(data)
        const messageBox = document.getElementById("messageBox")

        if(data.success) {
            messageBox.textContent = data.message
            messageBox.style.backgroundColor = 'green'
            passwordModal.classList.remove('open')
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } else{
            messageBox.textContent = data.message
            messageBox.style.backgroundColor = 'red'
        }

    } catch (error) {
        console.error('Error al enviar la contraseña:', error)
    }
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
