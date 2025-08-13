const createHttpError = require("http-errors");
const User = require("../models/user.model");
const { jwtactivationkey, clientURL } = require("../secret");
const { createJsonwebtoken } = require("../helper/jsonwebtoken");
const EmailwithNodeMailer = require("../helper/email");
const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs');
const mongoose = require("mongoose");



const getUser = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchRegEx = new RegExp(search, "i");

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegEx } },
        { email: { $regex: searchRegEx } },
        { phone: { $regex: searchRegEx } }
      ]
    };

    const users = await User.find(filter)
      .select("-password")
      .skip(skip)
      .limit(limit);

    const count = await User.countDocuments(filter);

    if (!users || users.length === 0) {
      throw createHttpError(404, "No users found");
    }

    res.status(200).json({
      message: "User profiles returned",
      users,
      pagination: {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        nextPage: page < Math.ceil(count / limit) ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null
      }
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;


    const image= req.file;
    if(!image){
      throw createHttpError(401,' image is required')
    }
    if(image.size> 1024*1024*2){
      throw createHttpError(400, 'image size must be lower than 2MB')

    }
    const imageBufferString = req.file.buffer.toString('base64')


    const userExist = await User.findOne({ email: email });

    if (userExist) {
      throw createHttpError(409, "User with this email already exists. Please try another.");
    }


    const token = createJsonwebtoken(
      { name, email, password, phone, address, image:  imageBufferString},
      jwtactivationkey,
      "10m"
    );

    const emailData = {
      email,
      subject: "Account Activation Mail",
      html: `
        <h2>Hello ${name}!</h2>
        <p>Please click below to activate your account:</p>
        <a href="${clientURL}/api/users/verify/${token}" target="_blank">
          Activate Your Account
        </a>
      `
    };

    // Send email
    try {
      await EmailwithNodeMailer(emailData);
    } catch (error) {
      return next(createHttpError(500, "Failed to send verification email"));
    }

    return res.status(200).json({
      message: `Please check your email (${email}) to complete registration.`,
      payload: { token }
    });

  } catch (error) {
    if (!error.status) error.status = 500;
    next(error);
  }
};



const activateUser = async (req, res, next) => {


  try {
    const token = req.body.token
    if (!token) throw createHttpError(404, 'token not found')
    const decoded = jwt.verify(token, jwtactivationkey)

    if (!decoded) throw createHttpError(401, 'token not verified')
    await User.create(decoded)




    return res.status(200).json({
      message: `user registered successfully`,
      payload: {decoded}
    });
  } catch (error) {
    next(error)
  }


}

const getUserbyID= async(req,res,next)=>{
  try {
    const id=req.body.id
    const user= await User.findOne({_id:id})
    if(!user) throw new Error(404, 'user not found')
    
      res.status(200).send({
        message: 'user found',
        payload: {user}
      })
  } catch (error) {
    next(error)
    
  }
}

const updateUser = async (req, res) => {

  const userid = req.params.id
  const updateoptions = { new: true, runvalidators: true, context: "query" }

  let updates = {}

  for (let key in req.body) {
    if (['name', 'password', 'phone', 'address'].includes(key)) {
      updates[key] = req.body[key]
    }
  }

  const updatedUser = await User.findByIdAndUpdate(userid, updates, updateoptions)
  if (!updatedUser) {
    throw createHttpError(404, "not updated")
  }
  return res.status(200).json({
    message: `user registered successfully`,
    payload: { updatedUser }
  });

}


const banuserbyId= async(req,res,next)=>{
  try {
    const userId= req.params.id
    const user=await User.findById(User, userId)
    if(!user) return new Error(401, 'user doesnot exist')
    const updates= {isBanned: true}
    const updateOptions={ new: true, runvalidators: true, context: 'query'}
    

    const updatedUser= await User.findByIdAndUpdate(
      userId,
      updates,
      updateOptions
    ).select('-password')
    if(!updatedUser){
      throw createHttpError(400, 'user was not banned')
    }
    return res.status(200).send({
      message: "user banned succesfully",
      payload: {updatedUser}
    })
    
  } catch (error) {
    next(error)
    
  }
}


const handleupdatePassword= async (req,res,next)=>{
  try {
    const {email, oldPassword, newPassword, confirmedPassword} = req.body
    const userId= req.params.id
    const user=await User.findById(User, userId)
    const isPasswordMatch= await bcrypt.compare(oldPassword, user.password)
    if(!isPasswordMatch){
      throw createHttpError(401, "old password didn't match")
    }
    const filter= {userId}
    const update={$set: {password: newPassword}}
    const updateOptions= {new: true}


    const updateUser= await User.findByIdAndUpdate(
      userId,
      update,
      updateOptions
    ).select('-password')




    return res.status(200).send({
      message: 'password changed successfully',
      payload:{updateUser}
      
    })
  } catch (error) {
    if( error instanceof mongoose.Error.CastError){
      throw createHttpError(400, 'invalid id')
    }
    next(error)
    
  }
}














module.exports = {
  getUser,
  registerUser,
  activateUser,
  updateUser,
  getUserbyID,
  banuserbyId,
  handleupdatePassword
};
