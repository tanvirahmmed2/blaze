require('dotenv').config()
const multer= require("multer")
createErr= require("http-errors")
const { FILE_TYPE, MAX_FILE_SIZE}= require("../config/index")



const storage = multer.memoryStorage()

const fileFilter= (req,file,cb)=>{
   if(!file.mimetype.startsWith("image/")){
    return cb(new Error("only image file's are allowed"), false)
   }
   if(file.size > MAX_FILE_SIZE){
    return cb(new Error("file size exxced the size limi9t"), false)

   }
   if(!FILE_TYPE.includes(file.mimetypes)){
    return cb(new Error("file type are not allowed"), false)

   }
   return cb(null, true)

}





const uploaduserImage = multer({ storage: storage ,
  storage: storage,
  fileFilter: fileFilter
})

module.exports= {uploaduserImage}