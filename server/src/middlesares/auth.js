const createErr = require("http-errors")

const jwt = require("jsonwebtoken")
const { jwtaccesskey } = require("../secret")

const isLoggedin = async (req, res, next) => {
    try {
        const token = req.cookies.accesToken
        if (!token) {
            throw createErr(401, 'access token not found')
        }
        const decoded = jwt.verify(token, jwtaccesskey)
        if (!decoded) {
            throw createErr(401, 'invalid access token, please login again')
        }
        req.user= decoded.user
        next()
    } catch (error) {
        next(error)

    }
}
const isLoggedout = async (req, res, next) => {
    try {
        const token = req.cookies.accesToken
        if (token) {
            try {
                const decoded = jwt.verify(token, jwtaccesskey)
                if (decoded) {
                    throw createErr(401, 'user loggedin')
                }
            } catch (error) {
                throw error
            }
        }

        next()
    } catch (error) {
        next(error)

    }
}

const isAdmin=async (req,res,next)=>{
    try {
        const user=req.user
        console.log(user.isAdmin)
        if(!user.isAdmin){
            throw createErr(400, ' you must be and admin. You must be admin to eleborate the data ')
        }
        return res.status(200).send({
            message: 'successfull admin',
            payload: {user}
        })
        next()
    } catch (error) {
        next(error)
        
    }
}



module.exports = { isLoggedin, isLoggedout, isAdmin }