const createErr= require('http-errors')
const Product = require("../models/product.model")



const deleteProduct= async(slug)=>{
    const product =await Product.findOneAndDelete({slug})
    if(!product){
        throw createErr(402, "product didn't found")
    }
    return product


}

module.exports= {deleteProduct}