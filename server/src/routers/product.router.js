const express= require('express')
const {getProducts, handlecreateProduct} = require('../controllers/product.controller')
const { isLoggedin, isAdmin } = require('../middlesares/auth')
const { uploaduserImage } = require('../middlesares/uploadFile')
const validateProduct = require('../validator/product')
const { runValidation } = require('../validator')

const productRouter= express.Router()

productRouter.get('/',getProducts)
productRouter.post('/create', isLoggedin, isAdmin, uploaduserImage.single('image'), validateProduct, runValidation,handlecreateProduct)



module.exports= productRouter