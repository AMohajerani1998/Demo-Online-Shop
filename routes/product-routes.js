const express = require('express')
const router = express.Router();
const productsController = require('../controllers/products-controller')

router.get('/products', productsController.loadProducts)
router.get('/products/:id', productsController.loadProductDetails)


module.exports = router;