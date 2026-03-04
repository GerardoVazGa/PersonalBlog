document.addEventListener('DOMContentLoaded', () => {
    const editorElement = document.getElementById("post-content-editor")
    const hiddenInput = document.getElementById("post-content")
    const formElement = document.getElementById("edit-post-form")
    const editButton = document.getElementById("btn-save-edit")
    const deleteButton = document.getElementById("btn-cancel-edit")

    if(!editorElement) return

    if(!hiddenInput) return

    if(!editButton) return

    if(!deleteButton) return

    const quill = new Quill("#post-content-editor", {
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
    });

    const initialContent = editorElement.dataset.content;
    quill.root.innerHTML = initialContent;

    hiddenInput.value = initialContent;

    quill.on("text-change", () => {
        hiddenInput.value = quill.root.innerHTML;
    });

    const postId = formElement.dataset.id;

    editButton.addEventListener("click", async(e) => {
        e.preventDefault()

        
        const title = document.getElementById("title").value.trim()
        const imageUrl = document.getElementById("post-image").files[0]
        const category = document.getElementById("category").value
        const tags = document.getElementById("post-tags").value.trim()
        const content = document.getElementById("post-content").value

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", imageUrl);
        formData.append("category", category);
        formData.append("tags", tags);
        formData.append("content", content);

        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: "PUT",
                body: formData
            })

            if(response.ok) {
                setTimeout(() => {
                    window.location.href = `/blog`
                }, 2000) 
            }

        } catch (error) {
            console.error("Error updating post:", error)
        }
    })

})