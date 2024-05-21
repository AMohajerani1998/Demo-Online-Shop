const Product = require("../models/product-model");

async function loadProducts(req, res, next) {
    let products;
    try {
        products = await Product.fetchProducts();
    } catch (error) {
        next(error);
    }
    res.render("customer/products/products", { products: products });
}

async function loadProductDetails(req, res, next) {
    let product;
    try {
        product = await Product.fetchProductById(req.params.id);
    } catch (error) {
        next(error);
    }
    res.render('customer/products/product-details', {product:product})
}

module.exports = {
    loadProducts: loadProducts,
    loadProductDetails: loadProductDetails,
};
