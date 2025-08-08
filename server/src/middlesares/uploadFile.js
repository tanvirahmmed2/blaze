require('dotenv').config()
const multer= require("multer")
const path= require('path')
createErr= require("http-errors")
const {UPLOAD_USER_IMAGE_DIR, FILE_TYPE, MAX_FILE_SIZE}= require("../config/index")



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_USER_IMAGE_DIR)
  },
  filename: function (req, file, cb) {
    const extname= path.extname(file.originalname)
    cb(null, Date.now() + "_" + file.originalname.replace(extname, "" + extname))
  }
})

const fileFilter= (req,file,cb)=>{
    const extname= path.extname(file.originalname)
    if(!FILE_TYPE.includes(extname.substring(1))){
      
      return cb(new Error("File type is not allowed"), false)
    }

    cb(null, true)


}





const upload = multer({ storage: storage ,

  limits: {fileSize: MAX_FILE_SIZE},
  fileFilter
})

module.exports= {upload}