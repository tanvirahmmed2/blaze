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

const idAdmin=async (req,res,next)=>{

}



module.exports = { isLoggedin, isLoggedout, idAdmin }