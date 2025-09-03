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

                const rowDiv = document.createElement('div')
                rowDiv.classList.add('form-row')

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

                //Tags Input
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

                rowDiv.appendChild(categoryDiv)
                rowDiv.appendChild(tagsDiv)

                // Content input
                const contentDiv = document.createElement("div")
                const contentLabel = document.createElement("label")
                contentLabel.htmlFor = "post-content"
                contentLabel.textContent = "Content"

                // Quill editor container
                const contentEditorDiv = document.createElement("div")
                contentEditorDiv.id = "post-content-editor"

                // Hidden Input for Quill
                const hiddenInput = document.createElement("input")
                hiddenInput.type = "hidden"
                hiddenInput.name = "content"
                hiddenInput.id = "post-content"
                hiddenInput.required = true

                contentDiv.appendChild(contentLabel)
                contentDiv.appendChild(contentEditorDiv)
                contentDiv.appendChild(hiddenInput)

                form.appendChild(titleDiv)
                form.appendChild(imageDiv)
                form.appendChild(rowDiv)
                form.appendChild(contentDiv)

                content.appendChild(form)

                const quill = new Quill("#post-content-editor", {
                    modules: {
                        toolbar: {
                            container: [
                                ["bold", "italic", "underline", "strike"], // toggled buttons
                                ["blockquote", "code-block"],
                                ["link", "image"],
                                [
                                    { list: "ordered" },
                                    { list: "bullet" },
                                ],
                                [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                [{ align: [] }],

                                ["clean"], // remove formatting button
                            ],
                            handlers: {
                                image: function () {
                                    const imageInput = document.createElement('input')
                                    imageInput.setAttribute('type', 'file')
                                    imageInput.setAttribute('accept', 'image/*')
                                    imageInput.click()

                                    imageInput.onchange = async () => {
                                        const imageFile = imageInput.files[0]
                                        if (imageFile) {
                                            const formData = new FormData()
                                            formData.append('image', imageFile)

                                            console.log(formData.get('image'))

                                            const response = await fetch('/upload', {
                                                method: 'POST',
                                                body: formData
                                            })

                                            const data = await response.json()

                                            const range = this.quill.getSelection()

                                            console.log(range)
                                            if (range) {
                                                console.log("entre")
                                                this.quill.insertEmbed(range.index, 'image', data.url)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    theme: "snow",
                })

                quill.on('text-change', () => {
                    hiddenInput.value = quill.root.innerHTML;
                })
            },
            onAction: async () => {
                const title = document.querySelector('#post-title').value.trim()
                const imageFile = document.querySelector('#post-image').files
                const category = document.querySelector('#post-category').value
                const tags = document.querySelector('#post-tags').value.trim()
                const content = document.querySelector('#post-content').value

                const formData = new FormData()
                formData.append('title', title)
                formData.append('image', imageFile[0])
                formData.append('category', category)
                formData.append('tags', tags)
                formData.append('content', content)

                console.log({
                    title,
                    imageFile,
                    category,
                    tags,
                    content
                })

                try {
                    const response = await fetch('/posts/add', {
                        method: 'POST',
                        body: formData
                    })

                    const data = await response.json()
                } catch (error) {
                    console.error('Error adding post:', error)
                }


            },
            buttonText: "Add Post"
        })
    })
}