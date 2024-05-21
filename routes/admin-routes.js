const express = require('express')
const router = express.Router();
const adminController = require('../controllers/admin-controller')
const imageUploaderMiddleware = require('../middlewears/image-uploader-middleware')


router.get('/products', adminController.loadProducts)

router.get('/products/add', adminController.loadProductForm)

router.post('/products', imageUploaderMiddleware, adminController.createNewProduct)

router.get('/products/:id', adminController.loadProductDetails)

router.post('/products/:id', imageUploaderMiddleware, adminController.editProduct)

router.delete('/products/:id', adminController.removeProduct)

module.exports = router;