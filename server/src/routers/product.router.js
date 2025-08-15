const express= require('express')
const {getProducts, handlecreateProduct, handlesingleProduct} = require('../controllers/product.controller')
const { isLoggedin, isAdmin } = require('../middlesares/auth')
const {  uploadproductimage } = require('../middlesares/uploadFile')
const validateProduct = require('../validator/product')
const { runValidation } = require('../validator')

const productRouter= express.Router()

productRouter.get('/',getProducts)
productRouter.post('/create', isLoggedin, isAdmin, uploadproductimage.single('image'), validateProduct, runValidation,handlecreateProduct)
productRouter.get('/:name', handlesingleProduct )


module.exports= productRouter