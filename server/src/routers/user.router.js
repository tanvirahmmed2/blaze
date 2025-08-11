const express = require("express")
const {getUser, registerUser, activateUser, updateUser, getUserbyID, banuserbyId, handleupdatePassword } = require("../controllers/user.controller")
const { uploaduserImage } = require("../middlesares/uploadFile")
const { ValidateRegistration } = require("../validator/auth")
const {runValidation}= require("../validator/index")
const { isLoggedin, isLoggedout, isAdmin }= require("../middlesares/auth")
const { uploadFile } = require("../secret")
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




userRouter.get("/", isLoggedin, isAdmin, getUser )
userRouter.get("/:id", isLoggedin,  getUserbyID )



userRouter.post("/register",  isLoggedout, registerUser)
userRouter.post("/verify", isLoggedout,activateUser)
userRouter.put("/:id", isLoggedin,updateUser)
// userRouter.put("/ban-user/:id", isLoggedin, isAdmin , banuserbyId)

userRouter.put("/update-password/:id", isLoggedin, handleupdatePassword)


userRouter.get("/profile", (req,res)=>{
    res.send("User profile")
})



module.exports = userRouter