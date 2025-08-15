const express = require("express")
const {getUser, registerUser, activateUser, updateUser, getUserbyID, banuserbyId, handleupdatePassword } = require("../controllers/user.controller")
const { uploaduserImage } = require("../middlesares/uploadFile")
const { ValidateRegistration } = require("../validator/auth")
const {runValidation}= require("../validator/index")
const { isLoggedin, isLoggedout, isAdmin }= require("../middlesares/auth")
const { uploadFile } = require("../secret")
const userRouter = express.Router()






userRouter.get("/", isLoggedin, isAdmin, getUser )
userRouter.get("/:id", isLoggedin,  getUserbyID )



userRouter.post("/register", uploaduserImage.single('image'), ValidateRegistration, runValidation, isLoggedout, registerUser)
userRouter.post("/verify", isLoggedout,activateUser)
userRouter.put("/:id", isLoggedin,updateUser)
// userRouter.put("/ban-user/:id", isLoggedin, isAdmin , banuserbyId)

userRouter.put("/update-password/:id", isLoggedin, handleupdatePassword)


userRouter.get("/profile", (req,res)=>{
    res.send("User profile")
})



module.exports = userRouter