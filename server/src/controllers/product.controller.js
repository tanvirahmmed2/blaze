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




const handlecreateProduct = async (req, res, next) => {
  try {
    const { name, description, price, quantity, shipping, category } = req.body;
    const image = req.file;

    if (!image) {
      throw createErr(400, 'Image file not found');
    }

    if (image.size > 1024 * 1024 * 10) {
      throw createErr(400, 'File too large, must be less than 10MB');
    }

    const productExist = await Product.exists({ name: name });
    if (productExist) {
      throw createErr(409, 'Product already exists');
    }

    const product = await Product.create({
      name: name,
      slug: slugify(name),
      description: description,
      price: price,
      quantity: quantity,
      shipping: shipping,
      category: category,
      
    });
 if(image){
  product.image= image
 }
    res.status(201).send({
      message: "Product created successfully",
      payload: { product }
    });
  } catch (error) {
    next(error);
  }
};

const handlesingleProduct= async(req,res,next)=>{
  try {
    const name= req.params.name
    const slug= slugify(name)

    const product= await Product.findOne({slug: slug})


    res.status(200).send({
      message: "Product returned",
      payload: {product}
    })
  } catch (error) {
    next(error)
    
  }
}


module.exports = {getProducts, handlecreateProduct, handlesingleProduct};
