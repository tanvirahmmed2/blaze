const express= require('express')
const {getProducts, handlecreateProduct} = require('../controllers/product.controller')
const { isLoggedin, isAdmin } = require('../middlesares/auth')
const { uploaduserImage, uploadproductimage } = require('../middlesares/uploadFile')
const validateProduct = require('../validator/product')
const { runValidation } = require('../validator')

const productRouter= express.Router()

productRouter.get('/',getProducts)
productRouter.post('/create', isLoggedin, isAdmin, uploadproductimage.single('image'), validateProduct, runValidation,handlecreateProduct)



module.exports= productRouter