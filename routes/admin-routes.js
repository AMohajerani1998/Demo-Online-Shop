const express = require('express')
const router = express.Router();
const adminController = require('../controllers/admin-controller')

router.get('/products', adminController.loadProducts)

router.get('/products/new', adminController.createNewProduct)

router.get('/products/:id/edit', adminController.editProduct)

module.exports = router;