function loadProducts(req, res, next){
    res.render('admin/products/products')
}

function createNewProduct(req, res, next){

}

function editProduct(req, res, next){
    
}

module.exports = {
    loadProducts : loadProducts,
    createNewProduct : createNewProduct,
    editProduct : editProduct
}