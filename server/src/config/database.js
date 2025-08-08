const mongoose= require("mongoose")
const { mongodbUrl } = require("../secret")

const connectDB= async (options={})=>{
    try {
        await mongoose.connect(mongodbUrl, options);
        console.log(`database server is connected`)
        mongoose.connection.on('error', (error)=>{
            console.error('DB connection error: ', error)
        })
    } catch (error) {
        console.log(`couldn't connect to db`)
    }
}

module.exports= connectDB