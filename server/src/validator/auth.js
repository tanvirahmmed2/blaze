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

    body("adress")
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
    body("image")
    .optional()
    .isString()
    .withMessage("image is required")



]









module.exports = {
    ValidateRegistration,

}