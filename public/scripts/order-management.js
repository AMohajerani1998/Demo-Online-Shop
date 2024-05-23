const orderUpdateButtons = document.querySelectorAll(
    ".order-management-form > button"
);

async function updateOrder(event) {
    event.preventDefault();
    const formData = new FormData(event.target.parentElement);
    const orderId = formData.get("orderId");
    const orderStatus = formData.get("status");
    const csrfToken = formData.get("csrftoken");
    let result;
    try {
        result = await fetch(`/admin/orders/${orderId}`, {
            method: "PATCH",
            body: JSON.stringify({
                _csrf: csrfToken,
                status: orderStatus,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        alert("Something went wrong! Please try again.");
    }
    if (!result.ok) {
        alert("Something went wront! Please try again.");
    }
    const resultData = await result.json();
    event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.order-status').textContent = resultData.orderStatus
}

for (const orderUpdateButton of orderUpdateButtons) {
    orderUpdateButton.addEventListener("click", updateOrder);
}
