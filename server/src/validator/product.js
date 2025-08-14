const { body } = require('express-validator')

const validateProduct = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Product name is required')
        .isLength({ min: 3 })
        .withMessage("Name must be more than 3 character"),
    body('price')
        .trim()
        .notEmpty('price is required'),
    body('description')
        .trim()


]

module.exports = validateProduct