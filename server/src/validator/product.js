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
        .notEmpty()
        .withMessage('price is required'),
    body('description')
        .trim()
        .notEmpty
        .withMessage('description is required')
        .isLength({ min: 3 })
        .withMessage("description must be more than 3 character"),
    body('quantity')
        .trim()
        .notEmpty
        .withMessage('quantity is required'),
    body("image")
        .custom((value, { req }) => {
            if (!req.file || req.file.buffer) {
                throw new Error("user image is required")
            }
            return true
        })
        .withMessage("image is required")


]

module.exports = validateProduct