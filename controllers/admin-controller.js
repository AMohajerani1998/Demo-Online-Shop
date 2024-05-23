const Product = require("../models/product-model");
const Order = require("../models/order-model");

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
        return next(error);
    }

    res.json({ message: "Product deleted." });
}

async function loadOrders(req, res, next) {
    let orders;
    try {
        orders = await Order.fetchAllOrders();
    } catch (error) {
        return next(error);
    }
    res.render("admin/orders/manage-orders", { orders: orders });
}

async function updateOrder(req, res, next) {
    let result;
    const orderId = req.params.id;
    const newStatus = req.body.status;
    let order;
    try {
        order = await Order.fetchOrderById(orderId);
    } catch (error) {
        return next(order);
    }
    order.status = newStatus;
    try {
        result = await order.saveOrder();
    } catch (error) {
        return next(error);
    }
    res.status(201).json({
        message: "Success",
        orderStatus: order.status,
    });
}

module.exports = {
    loadProducts: loadProducts,
    createNewProduct: createNewProduct,
    loadProductForm: loadProductForm,
    loadProductDetails: loadProductDetails,
    editProduct: editProduct,
    removeProduct: removeProduct,
    loadOrders: loadOrders,
    updateOrder: updateOrder,
};
