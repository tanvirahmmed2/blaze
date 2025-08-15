const { body } = require('express-validator');

const validateProduct = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Product name is required')
        .isLength({ min: 3 })
        .withMessage("Name must be more than 3 characters"),

    body('price')
        .trim()
        .notEmpty()
        .withMessage('Price is required'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 3 })
        .withMessage("Description must be more than 3 characters"),

    body('quantity')
        .trim()
        .notEmpty()
        .withMessage('Quantity is required'),

    body("image")
        .isString()
        .optional()
        .withMessage("product image is optional")
];

module.exports = validateProduct;
