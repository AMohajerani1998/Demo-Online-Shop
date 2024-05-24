const Order = require('../models/order-model')
const User = require('../models/user-model')
const stripe = require('stripe')('')    //api key

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
    
    const session = await stripe.checkout.sessions.create({
        line_items: cart.items.map(function (cartItem) {
            return {
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: cartItem.product.title,
                    },
                    unit_amount: +cartItem.product.price.toFixed(2) * 100,
                },
                quantity: cartItem.quantity,
            };
        }),
        mode: "payment",
        success_url: `http://localhost:3000/orders/success`,
        cancel_url: `http://localhost:3000/orders/failure`,
    });

    res.redirect(303, session.url);
}

async function loadOrders(req, res){
    const orders = await Order.fetchOrdersForUser(req.session.user.id)
    res.render('customer/orders/orders', {orders:orders})
}

function loadOrderSuccess(req, res){
    res.render('customer/orders/success')
}

function loadOrderFailure(req, res){
    res.render('customer/orders/failure')
}

module.exports = {
    loadOrders : loadOrders,
    submitOrder : submitOrder,
    loadOrderSuccess : loadOrderSuccess,
    loadOrderFailure : loadOrderFailure
}