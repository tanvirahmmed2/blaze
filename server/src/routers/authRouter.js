const express = require("express")

const {runValidation}= require("../validator/index")
const {handleLogin, handleLogout, handlerefreshToken} = require("../controllers/auth.controller")
const { isLoggedout, isLoggedin } = require("../middlesares/auth")
const authRouter = express.Router()


authRouter.post("/login", isLoggedout,handleLogin)
authRouter.post("/logout", isLoggedin,handleLogout)
authRouter.post('/refresh-token', handlerefreshToken)





module.exports= authRouter