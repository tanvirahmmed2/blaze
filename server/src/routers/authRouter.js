const express = require("express")

const {runValidation}= require("../validator/index")
const {handleLogin, handleLogout} = require("../controllers/auth.controller")
const { isLoggedout, isLoggedin } = require("../middlesares/auth")
const authRouter = express.Router()


authRouter.post("/login", isLoggedout,handleLogin)
authRouter.post("/logout", isLoggedin,handleLogout)






module.exports= authRouter