const express = require("express")

const {runValidation}= require("../validator/index")
const handleLogin = require("../controllers/auth.controller")
const authRouter = express.Router()


authRouter.post("/login", handleLogin)
authRouter.post("/logout", handleLogin.handleLogout)






module.exports= authRouter