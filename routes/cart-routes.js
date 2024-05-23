const cartController = require("../controllers/cart-controller");
const express = require("express");
const router = express.Router();

router.get('/', cartController.loadCart)

router.post("/items", cartController.addItemToCart);

router.patch("/items", cartController.updateCartItem)

module.exports = router;
