const User = require("../models/user.model")
const data = require("../data")

const seedUser= async (req,res,next)=>{
    try {
        // delet all existing user
        await User.deleteMany({})

        //inserting new user
        const users= await User.insertMany(data.users)

        return res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

module.exports= seedUser