document.addEventListener('DOMContentLoaded', () => {
    const editorElement = document.getElementById("post-content-editor");
    const hiddenInput = document.getElementById("post-content");

    console.log("editPost.js loaded")
    if(!editorElement) return

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

    console.log("quill init");

    const initialContent = editorElement.dataset.content;
    quill.root.innerHTML = initialContent;

    hiddenInput.value = initialContent;

    quill.on("text-change", () => {
        hiddenInput.value = quill.root.innerHTML;
    });

})