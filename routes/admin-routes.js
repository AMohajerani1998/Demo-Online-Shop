const express = require('express')
const router = express.Router();
const adminController = require('../controllers/admin-controller')
const imageUploaderMiddleware = require('../middlewears/image-uploader-middleware')


router.get('/products', adminController.loadProducts)

router.post('/products', imageUploaderMiddleware, adminController.createNewProduct)

router.get('/products/add', adminController.loadProductForm)

router.get('/products/:id/edit', adminController.editProduct)

module.exports = router;