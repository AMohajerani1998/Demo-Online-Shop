const Product = require("../models/product-model");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

async function loadProducts(req, res, next) {
    let products;
    try {
        products = await Product.fetchProducts();
    } catch (error) {
        return next(error);
    }
    res.render("admin/products/products", { products: products });
}

function loadProductForm(req, res) {
    res.render("admin/products/add-product");
}

async function createNewProduct(req, res, next) {
    const userData = req.body;
    const product = new Product({
        ...userData,
        image: req.file.filename,
    });
    try {
        await product.saveProduct();
    } catch (error) {
        return next(error);
    }
    res.redirect("/admin/products");
}

async function loadProductDetails(req, res, next) {
    let product;
    try {
        product = await Product.fetchProductById(req.params.id);
        res.render("admin/products/edit-product", { product: product });
    } catch (error) {
        return next(error);
    }
}

async function editProduct(req, res, next) {
    const product = new Product({
        ...req.body,
        _id: req.params.id,
    });
    if (req.file) {
        product.replaceImage(req.file.filename);
    }
    await product.saveProduct();
    res.redirect("/admin/products");
}

async function removeProduct(req, res, next) {
    let product;
    try {
        product = await Product.fetchProductById(req.params.id);
        await product.removeProduct();
    } catch (error) {
        next(error);
    }

    res.json({message: 'Product deleted.'})
}

module.exports = {
    loadProducts: loadProducts,
    createNewProduct: createNewProduct,
    loadProductForm: loadProductForm,
    loadProductDetails: loadProductDetails,
    editProduct: editProduct,
    removeProduct: removeProduct
};
