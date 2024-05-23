const Product = require('../models/product-model')

async function addItemToCart(req, res, next){
    const productId = req.body.id
    let product;
    try {
        product = await Product.fetchProductById(productId)
    } catch (error) {
        return next(error)
    }
    const cart = res.locals.cart
    await cart.addItem(product)
    req.session.cart = res.locals.cart
    res.status(201).json({
        message: 'success',
        newTotalQuantity: cart.totalQuantity,
        newTotalPrice: cart.totalPrice
    })
}

function loadCart(req, res){
    res.render('customer/cart/cart')
}

async function updateCartItem(req, res, next){
    const productId = req.body.id
    const cartItemNewQuantity = +req.body.cartItemNewQuantity
    const updateResult = res.locals.cart.updateItem(productId, +cartItemNewQuantity)
    req.session.cart = res.locals.cart
    res.status(201).json({
        message: 'Successfully updated',
        newTotalPrice: +res.locals.cart.totalPrice,
        newTotalQuantity: res.locals.cart.totalQuantity,
        productNewTotalPrice: +updateResult.productNewTotalPrice,
    })
}



module.exports = {
    addItemToCart : addItemToCart,
    loadCart : loadCart,
    updateCartItem : updateCartItem
}