const createErr = require('http-errors');
const slugify= require('slugify')
const Product = require("../models/product.model");

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        
        if (!products.length) {
            return next(createErr(404, 'No products found'));
        }

        res.status(200).send({
            message: "Products returned",
            payload: { products }
        });
    } catch (error) {
        next(error);
    }
};




const handlecreateProduct= async(req,res,next)=>{
    try {
        const {name, description, price, quantity,  shipping,  category}= req.body
        const image= req.file
        if(!image){
            throw createErr(400, 'image file not found')
        }
        if(image.size>1024*1024*2){
            throw createErr(400, 'File too large, It must be less than 2MB')
        }
        const imageBufferString= image.buffer.toString('base64')
        const productExist= await Product.exists({name: name})
        if(productExist){
            throw createErr(409,' product already exist')
        }

        const product= await Product.create({
            name: name,
            slug: slugify(name),
            description: description,
            price: price,
            quantity: quantity,
            shipping: shipping,
            image: imageBufferString,
            category: category
        })


        res.status(200).send({
            message: "products created successfully",
            payload:{product}
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {getProducts, handlecreateProduct};
