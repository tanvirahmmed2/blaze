const users = require("../models/user.model")


const getUser = (req, res, next) => {
    try {
        res.status(200).send({
            message: "user profile is returned",
            users: users
        })
    } catch (error) {
        next(error)
    }
}

module.exports = getUser