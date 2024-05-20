const express = require('express')
const router = express.Router();
const guardRoute = require('../middlewears/auth-protection-middleware')

router.get('/products', function(req, res){
    res.render('customer/products/products')
})
module.exports = router;