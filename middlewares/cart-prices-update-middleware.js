async function updateCartPrices(req, res, next) {
    await res.locals.cart.updateCartItems();
    next();
}


module.exports = updateCartPrices;