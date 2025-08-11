const express = require("express")

const {runValidation}= require("../validator/index")
const {handleLogin, handleLogout, handlerefreshToken, handleProtectedRoute} = require("../controllers/auth.controller")
const { isLoggedout, isLoggedin } = require("../middlesares/auth")
const { validateRefreshToken } = require("../validator/auth")
const authRouter = express.Router()


authRouter.post("/login", isLoggedout,handleLogin)
authRouter.post("/logout", isLoggedin,handleLogout)
authRouter.post('/refresh-token', validateRefreshToken, runValidation,handlerefreshToken)
authRouter.get('/protected', handleProtectedRoute)





module.exports= authRouter