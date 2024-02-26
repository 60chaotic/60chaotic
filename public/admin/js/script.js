// button status
const buttonStatus = document.querySelectorAll("[button-status]");

if(buttonStatus.length > 0) {
    const url = new URL(window.location.href);

    buttonStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            
            if(status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        })
    })
}
// end button status


// form search
const formSearch = document.querySelector("#form-search");

if(formSearch) {
    const url = new URL(window.location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const value = e.target.elements.keyword.value;

        if(value) {
            url.searchParams.set("keyword", value);
        } else {
            url.searchParams.delete("keyword");
        }

        window.location.href = (url.href);
    })
}
// end form search



// Pagination
const buttonsPaginaton = document.querySelectorAll("[buttonPagination]");


if(buttonsPaginaton.length > 0) {
    const url = new URL(window.location.href);

    buttonsPaginaton.forEach((button) => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("buttonPagination");
           
            if(page) {
                url.searchParams.set("page", page);
            }

            window.location.href = (url.href);
        })
    })
}
// End Pagination

// button-change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("[form-change-status]");
    const path = formChangeStatus.getAttribute("data-path")

    buttonChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const statusCurrent = button.getAttribute("data-status");
            
            const statusChange = statusCurrent == "active" ? "inactive" : "active"

            const action = `${path}/${statusChange}/${id}?_method=PATCH`

            formChangeStatus.action = action;

            formChangeStatus.submit();
        })
    })
}
// End button-change-status

// Checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked == true) {
            inputsId.forEach((input) => {
                input.checked = true;
            })
        } else {
            inputsId.forEach((input) => {
                input.checked = false;
            })
        }
    });

    inputsId.forEach((input) => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;

            }
        })
    })
}
// End Checkbox-multi

// Form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");

if(formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();

        const type = e.target.elements.type.value;
        console.log(type)

        if(type == "delete-all") {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa những sản phẩm này?")
            if(isConfirm == false) {
                return;
            }
        }

        const inputChecked = document.querySelectorAll("input[name='id']:checked");
        if(inputChecked.length > 0) {
            const ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputChecked.forEach((input) => {
                const id = input.value;
                if(type == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;

                    ids.push(`${id} - ${position}`);
                } else {
                    ids.push(id);
                }
            })

            console.log(ids);
            // console.log(ids.join(", "));
            inputIds.value = ids.join(", ");

            formChangeMulti.submit();

        } else {
            alert("Vui lòng chọn ít nhất 1 sản phẩm");
        }
    })
}
// End Form-change-multi

// Delete Item
const buttonDelete = document.querySelectorAll("[button-delete]");

if(buttonDelete.length > 0) {
    const formDeleteItem = document.querySelector("[form-delete-item]");
    const path = formDeleteItem.getAttribute("data-path");

    buttonDelete.forEach((button) => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm?");
            if(isConfirm == true) {
                const id = button.getAttribute("data-id");

                const action = `${path}/${id}?_method=DELETE`

                formDeleteItem.action = action;

                formDeleteItem.submit();
            } 
        })
    })
}

// End Delete Item

// show-alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
    const time = showAlert.getAttribute("data-time");

    const realTime = parseInt(time);

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, realTime)

    const closeAlert = document.querySelector("[close-alert]");
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}


// End show-alert

// Preview image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        const [file] = uploadImageInput.files;

        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
}
// End Preview image