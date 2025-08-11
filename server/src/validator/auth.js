const { body } = require("express-validator")



//registration
const ValidateRegistration = [
    body("name")
        .trim(),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("enter a valid email"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 6 })
        .withMessage("password should be atleast 6 character"),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("adress is required")
        .isLength({ min: 3 })
        .withMessage("address should be atleast 3 character"),
    body("phone")
        .trim()
        .notEmpty()
        .withMessage("phone is required")
        .isLength({ min: 3 })
        .withMessage("address should be atleast 3 character"),
    // body("image")
    //     .custom((value, {req})=>{
    //         if(!req.file || req.file.buffer){
    //             throw new Error("user image is required")
    //         }
    //         return true
    //     })
    //     .withMessage("image is required")



]





const validateRefreshToken=[
    body('refreshToken')
    .trim()
    .notEmpty()
    .withMessage('refreshToken in required')
]



module.exports = {
    ValidateRegistration,
    validateRefreshToken

}