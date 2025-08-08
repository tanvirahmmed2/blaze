const mongoose= require("mongoose")
const bcrypt= require('bcryptjs')
const { defaultImage } = require("../secret")

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'username is  missing'],
        trim: true,
        maxlength: [31, 'username can be maximum 31 character']
    },
    password: {
        type: String,
        require: [true, 'user password is  missing'],
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
        require: [true, 'user name is  missing'],
        trim: true,
        unique: [true, 'email must be unique'],
        lowercase: true
        
    },
    image: {
        type: String,
        default: defaultImage,
        
    },
    adress: {
        type: String,
        require: [true, 'adrees is required'],
        
    },
    phone: {
        type: String,
        require: [true, 'phone is required'],
        
    },
    isAdmin: {
        type: Boolean,
        default: false
        
    },
    isBan: {
        type: Boolean,
        default: false
        
    },
    name:{
        type: String,
        
    },
    

}, {timestamps: true})


const User= mongoose.model('users', userSchema)
module.exports= User