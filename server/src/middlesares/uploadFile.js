require('dotenv').config()
const multer= require("multer")
const path= require('path')
createErr= require("http-errors")

const UPLOAD_FILE= process.env.UPLOAD_FILE
const FILE_TYPE= process.env.FILE_TYPE || ['jpg', 'jpeg', 'png']
const MAX_FILE_SIZE= Number(process.env.MAX_FILE_SIZE) || 2097152


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_FILE)
  },
  filename: function (req, file, cb) {
    const extname= path.extname(file.originalname)
    cb(null, Date.now() + "_" + file.originalname.replace(extname, "" + extname))
  }
})

const fileFilter= (req,file,cb)=>{
    const extname= path.extname(file.originalname)
    if(!FILE_TYPE.includes(extname.substring(1))){
      const error= createErr(404, 'file type not allowed')
    
      return cb(error)
    }
    console.log(FILE_TYPE)
    cb(null, true)


}





const upload = multer({ storage: storage ,

  limits: {fileSize: MAX_FILE_SIZE},
  fileFilter
})

module.exports= {upload}