
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


