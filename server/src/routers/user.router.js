const express = require("express")
const getUser = require("../controllers/user.controller")
const userRouter = express.Router()

const isLogin = (req, res, next) => {
    const login = true
    if (login) {
        req.body.id = 101
        next()

    } else {
        return res.status(404).json({
            message: "please login first"
        })
    }
}




userRouter.get("/", isLogin, getUser )
userRouter.get("/profile", (req,res)=>{
    res.send("User profile")
})



module.exports = userRouter