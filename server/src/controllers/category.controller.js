const slugify= require('slugify')
const createErr= require("http-errors")
const Category= require('../models/category.model')
const { createCategory, getCategories, getCategory, updateCategory } = require('../service/categoryService')


const hanldeCreateCategory= async(req,res,next)=>{
    try {


        const {name}= req.body
        
        const newCategory= await createCategory(name)








        res.status(200).send({
            message: "category created successfully",
            payload:{newCategory}
        })
    } catch (error) {
        next(error)
        
    }
}


const handlegetCategories= async(req,res,next)=>{
    try {

        
        const categories= await getCategories()


        return res.status(200).send({
            message: "categories are returned",
            payload:{categories}
        })
    } catch (error) {
        next(error)
        
    }
}
const handlegetCategory= async(req,res,next)=>{
    try {
        const {slug}= req.params
        const category= await getCategory(slug)


        return res.status(200).send({
            message: "category  returned",
            payload:{category}
        })
    } catch (error) {
        next(error)
        
    }
}


const hanldeupdateCategory= async(req,res,next)=>{
    try {


        const {name}= req.body;
        const {slug}= req.params 
        
        const updatedcategory= await updateCategory(slug, name)


        if(!updatedcategory){
            throw createErr(401, 'category not found')
        }





        res.status(200).send({
            message: "category updated successfully",
            oldaName: slug,
            payload:{updatedcategory}
        })
    } catch (error) {
        next(error)
        
    }
}

module.exports= {hanldeCreateCategory, handlegetCategories, handlegetCategory, hanldeupdateCategory}