const express= require('express')
const {getProducts, handlecreateProduct, handlesingleProduct, handleDelete, handleUpdate} = require('../controllers/product.controller')
const { isLoggedin, isAdmin } = require('../middlesares/auth')
const {  uploadproductimage } = require('../middlesares/uploadFile')
const validateProduct = require('../validator/product')
const { runValidation } = require('../validator')

const productRouter= express.Router()

productRouter.get('/',getProducts)
productRouter.post('/create', isLoggedin, isAdmin, uploadproductimage.single('image'), validateProduct, runValidation,handlecreateProduct)
productRouter.get('/:name', handlesingleProduct )
productRouter.delete('/:slug', isLoggedin, isAdmin, handleDelete)
productRouter.put('/:slug', isLoggedin, isAdmin,uploadproductimage.single('image'), handleUpdate)


module.exports= productRouter