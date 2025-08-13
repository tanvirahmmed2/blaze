const express= require('express')
const {getProducts, handlecreateProduct} = require('../controllers/product.controller')
const { isLoggedin, isAdmin } = require('../middlesares/auth')

const productRouter= express.Router()

productRouter.get('/',getProducts)
productRouter.post('/create', isLoggedin, isAdmin,handlecreateProduct)



module.exports= productRouter