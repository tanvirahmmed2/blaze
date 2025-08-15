const createErr = require('http-errors');
const slugify = require('slugify')
const Product = require("../models/product.model");
const { deleteProduct } = require('../service/product.service');

const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;


    const products = await Product.find({})
      .populate("category")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })


    if (!products.length) {
      return next(createErr(404, 'No products found'));
    }

    const count= await Product.find({})
    .countDocuments()



    res.status(200).send({
      message: "Products returned",
      payload: { 
        products: products,
        pagination: {
          totalPage: Math.ceil(count/limit),
          currPage: page,
          prevPage: page -1,
          nextPage: page +1,
          totalNumberofProduct: count
        }
       }

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
    if (image) {
      product.image = image
    }
    res.status(201).send({
      message: "Product created successfully",
      payload: { product }
    });
  } catch (error) {
    next(error);
  }
};

const handlesingleProduct = async (req, res, next) => {
  try {
    const name = req.params.name
    if (!name) {
      throw createErr(400, 'Enter product name')
    }
    const slug = slugify(name)

    const product = await Product.findOne({ slug: slug })
    if (!product) {
      throw createErr(400, "no product found by this name")
    }



    res.status(200).send({
      message: "Product returned",
      payload: { product }
    })
  } catch (error) {
    next(error)

  }
}

const handleDelete= async(req,res,next)=>{
  try {

    const {slug}= req.params
    if(!slug){
      throw createErr(402, 'slug not found')
    }

    await deleteProduct(slug)




    res.status(200).send({
      message: "product deleted successfully"
    })
  } catch (error) {
    next(error)
    
  }
}

module.exports = { getProducts, handlecreateProduct, handlesingleProduct,handleDelete };
