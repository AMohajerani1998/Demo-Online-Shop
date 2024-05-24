const cartItemUpdateButtons = document.querySelectorAll(".cart-item-submit");
const overalPrice = document.getElementById("overall-price");
const cartCounters = document.querySelectorAll(".cart-counter");

async function updateCartItem(event) {
    event.preventDefault();
    const cartItemNewQuantity = +event.target.previousElementSibling.value;
    const productId = event.target.dataset.productid;
    const csrfToken = event.target.dataset.csrftoken;
    const productTotalPrice =
        event.target.parentElement.parentElement.previousElementSibling
            .children[1].children[0];
        let response;
    try {
        response = await fetch("/cart/items", {
            method: "PATCH",
            body: JSON.stringify({
                id: productId,
                cartItemNewQuantity: cartItemNewQuantity,
                _csrf: csrfToken,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        alert ('Something went wrong! Please check your network try again.')
    }
    if (!response.ok){
        console.log ('Something went wrong! Please try again.')
    }
    if (cartItemNewQuantity <= 0){
        event.target.parentElement.parentElement.parentElement.remove();
    }
    const responseData = await response.json();
    overalPrice.textContent = responseData.newTotalPrice.toFixed(2);
    for (const cartCounter of cartCounters){
        cartCounter.textContent = responseData.newTotalQuantity;
    }
    productTotalPrice.textContent = responseData.productNewTotalPrice.toFixed(2);
}

for (const cartItemUpdateButton of cartItemUpdateButtons) {
    cartItemUpdateButton.addEventListener("click", updateCartItem);
}
