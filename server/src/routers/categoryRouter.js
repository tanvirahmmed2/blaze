const express= require('express')
const { hanldeCreateCategory } = require('../controllers/category.controller')
const validateCategory = require('../validator/category')
const {isLoggedin, isAdmin}= require("../middlesares/auth")
const { runValidation } = require('../validator')



const categoryRouter= express.Router()

categoryRouter.post('/', validateCategory,runValidation, isLoggedin, isAdmin,hanldeCreateCategory)



module.exports= categoryRouter