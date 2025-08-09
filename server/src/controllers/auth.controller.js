const createErr= require("http-errors")
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const User= require("../models/user.model")
const {createJsonwebtoken}= require("../helper/jsonwebtoken")


const handleLogin= async (req,res)=>{
    try {
        //email/password
        const {email, password}= req.body
        //isexist
        const user= await User.findOne({email})
        if(!user) throw createErr(404, 'user doesnot exist, please register first')
        
        //password check
        const isPasswordMatch= await bcrypt.compare(password, user.password)
        if(!isPasswordMatch) throw createErr(404, "password wrong, try again")
        if(user.isBanned) {
            throw createErr(403, "you're banned. Please contact authority")
        }
        
        

        //success response
        return res.status(200).send({
            message: 'user logged in succefully',
            payload: {user}
        })
    } catch (error) {
        
    }
}


module.exports= handleLogin