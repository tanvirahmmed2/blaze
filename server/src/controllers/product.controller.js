const createErr = require('http-errors');
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
        




        res.status(200).send({
            message: "products created successfully"
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {getProducts, handlecreateProduct};
