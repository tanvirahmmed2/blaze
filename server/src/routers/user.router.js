const express = require("express")
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


const users = [
    { id: 1, name: "Tanvir Ahmmed" },
    { id: 2, name: "Sara" },
    { id: 3, name: "Ayan" }
]

userRouter.get("/api/user", isLogin, (req, res) => {
    console.log(`/api/user`)
    res.status(200).send({
        message: "user profile is returned",
        users: users
    })
})



module.exports = userRouter