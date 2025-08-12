const express= require('express')
const {getProducts, handlecreateProduct} = require('../controllers/product.controller')

const productRouter= express.Router()

productRouter.get('/',getProducts)
productRouter.get('/create',handlecreateProduct)



module.exports= productRouter