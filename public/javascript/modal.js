class Modal {
    constructor() {
        this.modal = document.querySelector('.generic-modal')
        this.title = document.querySelector('.modal-title')
        this.closeModalBtn = document.querySelector('#close-modal-btn')
        this.modalContent = document.querySelector('.modal-content')
        this.modalContainer = document.querySelector('.modal-container')
        this.modalBtnAction = document.querySelector('.modal-btn-action')
        this.modalBtnCancel = document.querySelector('.modal-btn-cancel')

        this.initialContainerClasses = this.modalContainer.className;
        this.open = false
        this.closeListeners()
    }

    closeListeners() {
        if(this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', () => this.close())
        }

        if(this.modal) {
            this.modal.addEventListener('click', (e) => {
                if(e.target === this.modal && this.open){
                    this.close()
                }
            })
        }

        document.addEventListener('keydown', (e) => {
            if(e.key === "Escape" && this.open){
                e.preventDefault()
                this.close()
            }
        })

    }

    show(config = {}){
        this.modalContent.textContent = ""
        this.resetStyles()

        if(config.title){
           this.title.textContent = config.title
        }

        if(config.content){
            if(typeof config.content === "function"){
                config.content(this.modalContent)
            }else if(typeof config.content === "string"){
                this.modalContent.innerHTML = config.content
            }
        }

        if(config.buttonText) {
            this.modalBtnAction.textContent = config.buttonText
        }

        const sizeClass = this.getSizeClass(config.size);

        if(sizeClass) {
            this.modalContainer.classList.add(sizeClass)
        }

        if(config.width) {
            this.modalContainer.style.width = config.width
        }

        if(config.className) {
            if(Array.isArray(config.className)) { // Verifica si es un array de clases
                this.modalContainer.classList.add(...config.className)
            }else {
                this.modalContainer.classList.add(config.className)
            }
        }

        if(config.onAction) {
            this.setupActionButton(config.onAction)
        }

        if(config.showCancel) {
            this.modalBtnCancel.style.display = 'inline-block'
            this.modalBtnCancel.addEventListener('click', () => this.close())
        }

        this.modal.classList.add("show")
        document.body.style.overflow = 'hidden';
        this.open = true

        return this
    }

    setupActionButton(onAction) {
        const newButtonAction = this.modalBtnAction.cloneNode(true)
        this.modalBtnAction.parentNode.replaceChild(newButtonAction, this.modalBtnAction)
        this.modalBtnAction = newButtonAction

        this.modalBtnAction.addEventListener("click", () => {
            onAction()
            this.close()
        })
    }

    resetStyles() {
        this.modalContainer.style.width = ""

        const sizeClasses = ['modal-small', 'modal-medium', 'modal-large']
        this.modalContainer.classList.remove(...sizeClasses)

        this.modalContainer.className = this.initialContainerClasses

        this.modalBtnCancel.style.display = 'none'
    }

    close() {
        this.modal.classList.remove("show")
        document.body.style.overflow = '';
        this.open = false
        return this
    }

    getSizeClass(size) {
        const sizeClasses = {
            small: 'modal-small',
            medium: 'modal-medium',
            large: 'modal-large',
            xlarge: 'modal-xlarge',
            tall: 'modal-tall'
        }

        return sizeClasses[size] || null
    }

    setWidth(width) {
        this.modalContainer.style.width = width
        return this
    }

    setTitle(title) {
        this.title.textContent = title
        return this
    }

    setContent(content) {
        if (typeof content === "function") {
            content(this.modalContent)
        } else if (typeof content === "string") {
            this.modalContent.innerHTML = content
        }

        return this
    }

    setButtonText(text) {
        this.modalBtnAction.textContent = text
        return this
    }
}

let modalInstance = null

// Singleton para que una sola instancia de modal exista
function getModalInstance() {
    if(!modalInstance) {
        modalInstance = new Modal()
    }

    return modalInstance
}

export function showModal(config){
    return getModalInstance().show(config)
}

export function closeModal(){
    return getModalInstance().close()
}