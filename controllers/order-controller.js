const Order = require('../models/order-model')
const User = require('../models/user-model')

async function submitOrder(req, res, next){
    const cart = res.locals.cart
    let user;
    try {
        user = await User.fetchUserById(req.session.user.id)
    } catch (error) {
        return next(error)
    }
    const order = new Order(cart, user)

    try {
        await order.saveOrder()
    } catch (error) {
        next (error)
    }
    req.session.cart = null;
    res.redirect('/orders')
}

async function loadOrders(req, res){
    const orders = await Order.fetchOrdersForUser(req.session.user.id)
    res.render('customer/orders/orders', {orders:orders})
}

module.exports = {
    loadOrders : loadOrders,
    submitOrder : submitOrder
}