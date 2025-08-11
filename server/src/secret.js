require("dotenv").config()

const serverPort= process.env.PORT
const mongodbUrl= process.env.MONGODB_URL || "mongodb://localhost:27017/ecommerceMernDB"
const defaultImage= process.env.DEFAULT_IMAGE
const jwtactivationkey= process.env.JWT_ACTIVATION_KEY || "ysiytg73768534wbv85t362bvg85ygt"
const jwtaccesskey= process.env.JWT_ACCESS_KEY || "ysiytg73768534wbv85t362bvsdwg85ygt"
const jwtrefreshkey= process.env.JWT_REFRESH_KEY
const smtpUSERNAME= process.env.SMTP_USERNAME
const smtpPASSWORD= process.env.SMTP_PASSWORD
const clientURL= process.env.CLIENT_URL
const uploadFile= process.env.UPLOAD_FILE

module.exports= { serverPort, clientURL, mongodbUrl, defaultImage, jwtactivationkey, smtpPASSWORD, smtpUSERNAME, uploadFile, jwtaccesskey, jwtrefreshkey}