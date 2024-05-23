const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order-controller')

router.get('/', orderController.loadOrders)

router.post('/', orderController.submitOrder)

module.exports = router;