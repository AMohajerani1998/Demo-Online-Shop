const Product = require("../models/product-model");
class Cart {
    constructor(items = [], totalQuantity = 0, totalPrice = 0) {
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
    }

    addItem(product) {
        const cartItem = {
            product: product,
            quantity: 1,
            totalPrice: product.price,
        };
        for (let i = 0; i < this.items.length; i++) {
            if (cartItem.product.id === this.items[i].product.id) {
                cartItem.quantity += +this.items[i].quantity;
                cartItem.totalPrice += +this.items[i].totalPrice;
                this.totalPrice += +cartItem.product.price;
                this.totalQuantity++;
                this.items[i] = cartItem;
                return;
            }
        }
        this.items.push(cartItem);
        this.totalQuantity++;
        this.totalPrice += cartItem.product.price;
    }

    updateItem(productId, cartItemNewQuantity) {
        for (let i = 0; i < this.items.length; i++) {
            const cartItem = this.items[i];
            if (productId === cartItem.product.id && cartItemNewQuantity > 0) {
                const totalQuantityDifference =
                    cartItem.quantity - cartItemNewQuantity;
                const newPrice = cartItem.product.price * cartItemNewQuantity;
                const priceChange = cartItem.totalPrice - newPrice;
                cartItem.quantity = cartItemNewQuantity;
                cartItem.totalPrice = newPrice;
                this.totalQuantity -= totalQuantityDifference;
                this.totalPrice -= priceChange;
                return {
                    productNewTotalPrice: cartItem.totalPrice,
                };
            } else if (
                productId === cartItem.product.id &&
                cartItemNewQuantity <= 0
            ) {
                this.items.splice(i, 1);
                this.totalQuantity -= cartItem.quantity;
                this.totalPrice -= cartItem.totalPrice;
                return {
                    productNewTotalPrice: 0,
                };
            }
        }
    }

    async updateCartItems() {
        const cartItemsIds = this.items.map(function (cartItem) {
            return cartItem.product.id;
        });
        const foundProducts = await Product.findMultipleProducts(cartItemsIds);
        const cartItemsToBeRemoved = [];
        for (const cartItem of this.items) {
            const productExists = foundProducts.find(function (foundProduct) {
                return foundProduct.id === cartItem.product.id;
            });

            if (!productExists) {
                cartItemsToBeRemoved.push(cartItem.product.id);
                continue;
            }
            cartItem.product = productExists;
            cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
        }
        if (cartItemsToBeRemoved.length > 0) {
            this.items = this.items.filter(function (cartItem) {
                return cartItemsToBeRemoved.indexOf(cartItem.product.id) < 0;
            });
        }

        this.totalPrice = 0;
        this.totalQuantity = 0;
        for (let cartItem of this.items) {
            this.totalQuantity += +cartItem.quantity;
            this.totalPrice += +cartItem.totalPrice;
        }
    }
}

module.exports = Cart;
