const {body}= require("express-validator")



//registration
const ValidateRegistration=[
    body("name")
    .trim()
    .notEmpty()
    .withMessage("name is requrired")
    .isLength({min:3, max:30})
    .withMessage("name should be atleast 3-30 character")
]









module.exports= {
    ValidateRegistration,

}