const createErr = require("http-errors")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/user.model")
const { createJsonwebtoken } = require("../helper/jsonwebtoken")
const { jwtaccesskey, jwtrefreshkey } = require("../secret")


const handleLogin = async (req, res, next) => {
    try {
        //email/password
        const { email, password } = req.body
        //isexist
        const user = await User.findOne({ email })
        if (!user) throw createErr(404, 'user doesnot exist, please register first')

        //password check
        // const isPasswordMatch = await bcrypt.compare(password, user.password)
        // if (!isPasswordMatch) throw createErr(404, "password wrong, try again")
        if (user.isBanned) {
            throw createErr(403, "you're banned. Please contact authority")
        }
        const accesstoken = createJsonwebtoken(
            { user },
            jwtaccesskey,
            "10m"
        );


        res.cookie('acces_Token', accesstoken, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
        const refreshtoken = createJsonwebtoken(
            { user },
            jwtrefreshkey,
            "7d"
        );


        res.cookie('refresh_Token', refreshtoken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })



        //success response
        return res.status(200).send({
            message: 'user logged in succefully',
            payload: { user, accesstoken }
        })
    } catch (error) {
        next(error)
    }
}
const handleLogout = async (req, res, next) => {
    try {


        res.clearCookie('acces_Token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });






        //success response
        return res.status(200).send({
            message: 'user logged out succefully',
            payload: {}
        })
    } catch (error) {
        next(error)
    }

}

const handlerefreshToken = async (req, res, next) => {
    try {
        const oldRefreshToken = req.cookies.refresh_Token; // ✅ correct name
        if (!oldRefreshToken) {
            throw createErr(401, 'refresh token not found');
        }

        const decoded = jwt.verify(oldRefreshToken, jwtrefreshkey); // will throw if invalid
        const user = decoded.user;

        const accesstoken = createJsonwebtoken(
            { user },
            jwtaccesskey,
            "10m"
        );

        res.cookie('acces_Token', accesstoken, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

        res.status(200).send({
            message: "successful",
            payload: { accesstoken }
        });
    } catch (error) {
        next(error);
    }
};
const handleProtectedRoute = async (req, res, next) => {
    try {
        const accesstoken = req.cookies.access_Token; 
        if (!accesstoken) {
            throw createErr(401, 'refresh token not found');
        }

        const decoded = jwt.verify(accesstoken, jwtrefreshkey); // will throw if invalid
        if(!decoded){
            throw createErr(401, 'invalid access token')
        }

      

        

        res.status(200).send({
            message: "protected resources successfully",
            payload: { accesstoken }
        });
    } catch (error) {
        next(error);
    }
};



module.exports = { handleLogin, handleLogout, handlerefreshToken,handleProtectedRoute }