require("dotenv").config()

const serverPort= process.env.PORT
const mongodbUrl= process.env.MONGODB_URL || "mongodb://localhost:27017/ecommerceMernDB"
const defaultImage= process.env.DEFAULT_IMAGE


module.exports= { serverPort, mongodbUrl, defaultImage}