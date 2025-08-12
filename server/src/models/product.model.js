const mongoose = require('mongoose')

const productShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'product name shouldbe minimum 3 characters']
    },
    slug: {
        type: String,
        required: [true, ' slug name is required'],
        trime: true,
        lowercase: true,
        minlength: [3, 'slug name length must be more than 3']
    },
    price: {
        type: number,
        required:[ true,'price is required'],
        trim: true,
        validate:{
            validator: function (v){
                return v>0
            },
            message: (props)=>{
                `${props.value} is not a valid price. price must be greater than 0`
            }
        }
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'description name shouldbe minimum 3 characters']
    },
    quantity: {
        type: String,
        required: true,
        trim: true,
    },
    sold: {
        type: Boolean,
        default: false,
    },


},
    { timestamps: true },
)


const Product = mongoose.model('products', productShema)
module.exports = Product