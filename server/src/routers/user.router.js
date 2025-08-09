const express = require("express")
const {getUser, registerUser, activateUser, updateUser, getUserbyID } = require("../controllers/user.controller")
const { uploaduserImage } = require("../middlesares/uploadFile")
const { ValidateRegistration } = require("../validator/auth")
const {runValidation}= require("../validator/index")
const isLoggedin = require("../middlesares/auth")
const userRouter = express.Router()

// const isLogin = (req, res, next) => {
//     const login = true
//     if (login) {
//         req.body.id = 101
//         next()

//     } else {
//         return res.status(404).json({
//             message: "please login first"
//         })
//     }
// }




userRouter.get("/",  getUser )
userRouter.get("/:id", isLoggedin, getUserbyID )



userRouter.post("/register",   registerUser)
userRouter.post("/verify", activateUser)
userRouter.put("/:id",updateUser)


userRouter.get("/profile", (req,res)=>{
    res.send("User profile")
})



module.exports = userRouter