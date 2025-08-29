import { showModal } from './modal.js'

// Add Post Modal
const addPostButton = document.querySelector('.add-post-btn')

if (addPostButton) {
    addPostButton.addEventListener('click', (e) => {
        e.preventDefault()
        showModal({
            title: "Add New Post",
            size: "tall", // 👈 tamaño de prueba
            content: async (content) => {
                // Create the form element
                const form = document.createElement("form")
                form.id = "form-add-post"
                form.enctype = "multipart/form-data"
                form.method = "POST"
                form.action = "/posts/add"
                form.classList.add("form-inputs")

                // Title input
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

                // Content input
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

                // Image input
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

                const categoryDiv = document.createElement('div')
                const categoryLabel = document.createElement('label')
                categoryLabel.htmlFor = 'post-category'
                categoryLabel.textContent = 'Category'
                const categorySelect = document.createElement('select')
                categorySelect.id = 'post-category'
                categorySelect.name = 'category'
                categorySelect.required = true

                // Assuming categories are available globally or fetched from the server
                try {
                    const response = await fetch('/api/categories')
                    const categories = await response.json()

                    categories.forEach(category => {
                        const option = document.createElement('option')
                        option.value = category.name
                        option.textContent = category.name
                        categorySelect.appendChild(option)
                    })
                }catch(error) {
                    console.error(error.message)
                }

                categoryDiv.appendChild(categoryLabel)
                categoryDiv.appendChild(categorySelect)

                const tagsDiv = document.createElement('div')
                const tagsLabel = document.createElement('label')
                tagsLabel.htmlFor = 'post-tags'
                tagsLabel.textContent = 'Post Tags (use "|" for separation)'
                const tagsInput = document.createElement('input')
                tagsInput.type = 'text'
                tagsInput.id = 'post-tags'
                tagsInput.name = 'tags'
                tagsInput.placeholder = 'e.g. tag1|tag2|tag3'
                tagsDiv.appendChild(tagsLabel)
                tagsDiv.appendChild(tagsInput)

                form.appendChild(titleDiv)
                form.appendChild(contentDiv)
                form.appendChild(imageDiv)
                form.appendChild(categoryDiv)
                form.appendChild(tagsDiv)

                content.appendChild(form)
            },
            onAction: () => {
                document.getElementById('form-add-post').submit()
            },
            buttonText: "Add Post"
        })
    })
}