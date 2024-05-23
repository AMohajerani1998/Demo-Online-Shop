const db = require('../data/database')
const mongodb = require('mongodb')
const ObjectId = mongodb.ObjectId;
class Product {
    constructor(productData){
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.description;
        this.image = productData.image;
        this.updateImagePaths();
        if (productData._id){
            this.id = productData._id.toString()
        }
    }

    static async fetchProducts(){
        const products = await db.getDb().collection('products').find().toArray();
        return products.map(function(product){
            return new Product(product)
        })
    }

    static async fetchProductById(id){
        let productId;
        try{
            productId = new ObjectId(id)
        } catch (error){
            error.code = 404;
            throw error
        }
        const result = await db.getDb().collection('products').findOne({_id: productId})
        if (!result){
            const error = new Error('Could not find the product with the given ID')
            error.code = 404;
            throw error;
        }
        const product = new Product(result)
        return product;
    }

    updateImagePaths(){
        this.imagePath = `/product-data/images/${this.image}`
        this.imageUrl = `/products/assets/images/${this.image}`
    }

    replaceImage(newImage){
        this.image = newImage;
        this.updateImagePaths()
    }

    async saveProduct(){
        if(this.id){
            const productData = {
                title: this.title,
                summary: this.summary,
                price: +this.price,
                description: this.description,
                image: this.image
            }
            if(!this.image){
                delete productData.image;
            }
            const productId = new ObjectId(this.id)
            await db.getDb().collection('products').updateOne({_id: productId},{
                $set: productData
            })
        } else{
            await db.getDb().collection('products').insertOne({
                title: this.title,
                summary: this.summary,
                price: this.price,
                description: this.description,
                image: this.image,
            })
        }
    }

    removeProduct(){
        const productId = new ObjectId(this.id)
        db.getDb().collection('products').deleteOne({_id: productId})
    }

     static async findMultipleProducts(ids){
         const productIds = ids.map(function(id){
             return new mongodb.ObjectId(id)
         })
         const result = await db.getDb().collection('products').find({_id: {$in: productIds}}).toArray();
         return result.map(function(product){
             return new Product(product)
         })
     }
}

module.exports = Product;