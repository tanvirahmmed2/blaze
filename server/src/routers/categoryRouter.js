const express= require('express')
const { hanldeCreateCategory, handlegetCategories, handlegetCategory, hanldeupdateCategory, handledeleteCategory } = require('../controllers/category.controller')
const validateCategory = require('../validator/category')
const {isLoggedin, isAdmin}= require("../middlesares/auth")
const { runValidation } = require('../validator')



const categoryRouter= express.Router()

categoryRouter.post('/', validateCategory,runValidation, isLoggedin, isAdmin,hanldeCreateCategory)
categoryRouter.get('/', handlegetCategories)
categoryRouter.get('/:slug', handlegetCategory)
categoryRouter.put('/:slug', hanldeupdateCategory)
categoryRouter.delete('/:slug', handledeleteCategory)



module.exports= categoryRouter