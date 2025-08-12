const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, ' category name is required'],
            trime: true,
            unique: true,
            minlength: [3, 'Category name length must be more than 3']
        },
        slug: {
            type: String,
            required: [true, ' slug name is required'],
            trime: true,
            lowercase: true,
            minlength: [3, 'slug name length must be more than 3']
        }
    },
    { timestamps: true }
)
const Category = mongoose.model('category', categorySchema)
module.exports = Category