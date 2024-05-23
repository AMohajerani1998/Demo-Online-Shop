const addItemToCartButton = document.querySelector("#add-to-cart-button");
const productid = addItemToCartButton.dataset.productid;
const csrfToken = addItemToCartButton.dataset.csrftoken;
const cartCounter = document.querySelector('#cart-counter')

let itemCount;
async function addItemToCart(event) {
    event.preventDefault();
    let response;
    try {
        response = await fetch("/cart/items", {
            method: "POST",
            body: JSON.stringify({
                id: productid,
                _csrf: csrfToken,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        alert("An error occurred! Please check your network and try again.");
    }
    if (!response.ok) {
        alert("An error occurred! Please try again later");
    }
    const responseData = await response.json();
    itemCount = responseData.newTotalQuantity
    cartCounter.textContent = itemCount
}

addItemToCartButton.addEventListener("click", addItemToCart);

