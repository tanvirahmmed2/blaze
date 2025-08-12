const {body}= require('express-validator')

const validateCategory= [
    body('name')
    .trim()
    .notEmpty()
    .withMessage('category name required')
    .isLength({min:3, max:34})
    .withMessage('name should be between 3 to 34 charcacter long')
]


module.exports= validateCategory