const express= require('express')
const {getProducts, handlecreateProduct} = require('../controllers/product.controller')
const { isLoggedin, isAdmin } = require('../middlesares/auth')
const { uploaduserImage } = require('../middlesares/uploadFile')

const productRouter= express.Router()

productRouter.get('/',getProducts)
productRouter.post('/create', isLoggedin, isAdmin, uploaduserImage.single('image'),handlecreateProduct)



module.exports= productRouter