const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Product name should be at least 3 characters']
    },
    slug: {
        type: String,
        required: [true, 'Slug name is required'],
        trim: true,
        lowercase: true,
        minlength: [3, 'Slug name length must be more than 3']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        trim: true,
        validate: {
            validator: (v) => v > 0,
            message: (props) => `${props.value} is not a valid price. Price must be greater than 0`
        }
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        trim: true,
        validate: {
            validator: (v) => v > 0,
            message: (props) => `${props.value} is not a valid quantity. Quantity must be greater than 0`
        }
    },
    sold: {
        type: Number,
        default: 0,
        trim: true,
        validate: {
            validator: (v) => v >= 0,
            message: (props) => `${props.value} is not a valid sold number. Sold number must be 0 or more`
        }
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Description should be at least 3 characters']
    },
    shipping: {
        type: Number,
        default: 0
    },
    image: {
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true }
    }
    ,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
