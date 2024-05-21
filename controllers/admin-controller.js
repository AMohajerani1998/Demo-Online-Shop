const Product = require("../models/product-model");

function loadProducts(req, res, next) {
    res.render("admin/products/products");
}

async function createNewProduct(req, res, next) {
    const userData = req.body;
    const product = new Product({
        ...userData,
        image: req.file.filename
    })
    try {
        await product.newProduct();
    } catch (error) {
        return next(error);
    }
    res.redirect("/admin/products");
}

function loadProductForm(req, res) {
    res.render("admin/products/add-product");
}

function editProduct(req, res, next) {}

module.exports = {
    loadProducts: loadProducts,
    createNewProduct: createNewProduct,
    loadProductForm: loadProductForm,
    editProduct: editProduct,
};
