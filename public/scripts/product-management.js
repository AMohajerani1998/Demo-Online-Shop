const deleteButtonElements = document.querySelectorAll('.delete-button')

async function deleteProduct(event){
    event.preventDefault();
    const buttonElement = event.target;
    const producttId = event.target.dataset.postid;
    const csrfToken = event.target.dataset.csrftoken;
    const response = await fetch('/admin/products/'+producttId+'?_csrf='+csrfToken, {
         method: 'DELETE'
     })
     if (!response.ok){
         alert('An error occurred! Please try again.')
         return
     }
    buttonElement.parentElement.parentElement.parentElement.parentElement.remove()
}

for (const deleteButtonElement of deleteButtonElements){
    deleteButtonElement.addEventListener('click', deleteProduct)
}