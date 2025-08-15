const createErr= require('http-errors')
const Product = require("../models/product.model")
const deleteImage = require('../helper/deleteImage.helper')



const deleteProduct= async(slug)=>{
    const product =await Product.findOneAndDelete({slug})
    if(!product){
        throw createErr(402, "product didn't found")
    }
    if(product && product.image){
        await deleteImage(product.image)
    }
    return product


}

module.exports= {deleteProduct}