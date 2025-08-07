const User = require("../models/user.model")
const createErr= require("http-errors")


const getUser = async (req, res, next) => {
    try {

        const search= req.query.search || "";
        const page= Number(req.query.page) || 1;
        const limit= Number(req.query.limit) || 1;

        const searchRegEx= new RegExp('.*' + search + '.*' )

        const filter={
            isAdmin:{$ne: true},
            $or:[
                {name: {$regex: searchRegEx}},
                {email: {$regex: searchRegEx}},
                {phone: {$regex: searchRegEx}}
            ]
        }

        const options= {password: 0}

        const users= await User.find()

        const count= await User.find(filter).countDocuments()


        if(!users) throw createErr(404, "no users found")

        res.status(200).send({
            message: "user profile is returned",
            users: users,
            pagination: {
                totalPages: Math.ceil(count / limit),
                currentPgae: page - 1<= 0?  1 :null,
                nextPage: page +1 <= Math.ceil(count / limit)? page + 1: null
            }
        })
    } catch (error) {
        next(error)
    }
}


const registerUser=  (req, res, next)=>{
    try {
        
        

        return successRespons(res, {
            statusCode: 200,
            message: "new user created"
        })
    } catch (error) {
        next(error)
    }

}

module.exports = {getUser, registerUser}