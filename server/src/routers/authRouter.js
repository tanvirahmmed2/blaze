const express = require("express")

const {runValidation}= require("../validator/index")
const {handleLogin, handleLogout} = require("../controllers/auth.controller")
const authRouter = express.Router()


authRouter.post("/login", handleLogin)
authRouter.post("/logout", handleLogout)






module.exports= authRouter