const mongoose= require("mongoose")
const bcrypt= require('bcryptjs')
const { defaultImage } = require("../secret")

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is  missing'],
        trim: true,
        maxlength: [31, 'username can be maximum 31 character']
    },
    name: {
        type: String,
        required: [true, 'username is  missing'],
        trim: true,
        maxlength: [31, 'username can be maximum 31 character']
    },
    password: {
        type: String,
        required: [true, 'user password is  missing'],
        trim: true,
        minlength: [3,'password length must be more than 3'],
        set: (v)=> bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    email: {
        type: String,
        validate: {
            validator:  (v)=>{
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
            },
            message: "please enter a valid email"
        },
        required: [true, 'user name is  missing'],
        trim: true,
        unique: [true, 'email must be unique'],
        lowercase: true
        
    },
    image: {
        type: Buffer,
        typeof: String
        
    },
    adress: {
        type: String,
        required: [true, 'adrees is required'],
        
    },
    phone: {
        type: String,
        required: [true, 'phone is required'],
        
    },
    isAdmin: {
        type: Boolean,
        default: false
        
    },
    isBan: {
        type: Boolean,
        default: false
        
    },
    

}, {timestamps: true})


const User= mongoose.model('users', userSchema)
module.exports= User