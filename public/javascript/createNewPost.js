document.addEventListener('DOMContentLoaded', () => {
    const editorElement = document.getElementById("new-post-content-editor")
    const hiddenInput = document.getElementById("new-post-content")
    const formElement = document.getElementById("create-post-form")
    const imagePreview = document.getElementById("current-image")
    const imageInput= document.getElementById("new-post-image")
    const addButton= document.getElementById("btn-create-post")
    const deleteButton = document.getElementById("btn-cancel-create")

    if (!editorElement || !hiddenInput || !addButton || !deleteButton) return

    const quill = new Quill("#new-post-content-editor", {
        modules: {
            toolbar: {
                container: [
                    ["bold", "italic", "underline", "strike"], // toggled buttons
                    ["blockquote", "code-block"],
                    ["link", "image"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ align: [] }],

                    ["clean"], // remove formatting button
                ],
                handlers: {
                    image: function () {
                        const imageInput = document.createElement("input");
                        imageInput.setAttribute("type", "file");
                        imageInput.setAttribute("accept", "image/*");
                        imageInput.click();

                        imageInput.onchange = async () => {
                            const imageFile = imageInput.files[0];
                            if (imageFile) {
                                const formData = new FormData();
                                formData.append("image", imageFile);

                                console.log(formData.get("image"));

                                const response = await fetch("/api/uploads", {
                                    method: "POST",
                                    body: formData,
                                });

                                const data = await response.json();

                                const range = this.quill.getSelection();

                                if (range) {
                                    this.quill.insertEmbed(range.index, "image", data.url);
                                }
                            }
                        };
                    },
                },
            },
        },
        theme: "snow",
    })

    quill.on("text-change", () => {
        hiddenInput.value = quill.root.innerHTML;
    })

    imageInput.addEventListener("change", () => {
        const file = imageInput.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                imagePreview.src = e.target.result
            }

            reader.readAsDataURL(file)
        }
    })


    addButton.addEventListener("click", async(e) => {
        e.preventDefault()

        const title = document.getElementById("new-post-title").value.trim()
        const category = document.getElementById("new-post-category").value
        const tags = document.getElementById("new-post-tags").value
        const imageFile = imageInput.files[0]
        const content = hiddenInput.value
        

        console.log(imageFile)
        
        if(!title || !category || !tags || !content || !imageFile) {
            alert("All fields are required")
            return
        }

        const formData = new FormData()
        formData.append("title", title)
        formData.append("image", imageFile)
        formData.append("category", category)
        formData.append("tags", tags)
        formData.append("content", content)

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: formData
            })

            if(response.ok) {
                const data = await response.json()
                alert(data.message)
                setTimeout(() => {
                    window.location.href = '/blog'
                }, 1000)
            } else {
                const errorData = await response.json()
                alert(errorData.message || "Error creating post")
            }

        } catch (error) {
            console.error("Error:", error)
        }
    })

})
