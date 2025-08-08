require("dotenv").config()

const serverPort= process.env.PORT
const mongodbUrl= process.env.MONGODB_URL || "mongodb://localhost:27017/ecommerceMernDB"
const defaultImage= process.env.DEFAULT_IMAGE
const jwtactivationkey= process.env.JWT_ACTIVATION_KEY || "ysiytg73768534wbv85t362bvg85ygt"
const smtpUSERNAME= process.env.SMTP_USERNAME
const smtpPASSWORD= process.env.SMTP_PASSWORD
const clientURL= process.env.CLIENT_URL

module.exports= { serverPort, clientURL, mongodbUrl, defaultImage, jwtactivationkey, smtpPASSWORD, smtpUSERNAME}