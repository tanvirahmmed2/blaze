require('dotenv').config()
const multer= require("multer")
createErr= require("http-errors")
const { FILE_TYPE, MAX_FILE_SIZE, UPLOAD_USER_IMAGE_DIR, UPLOAD_PRODUCT_IMAGE_DIR}= require("../config/index")



const userstorage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null, UPLOAD_USER_IMAGE_DIR)
  },
  filename: (req,file,cb)=>{
    cb(null, Date.now() + '_' + file.originalname)
  }
})
const productstorage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null, UPLOAD_PRODUCT_IMAGE_DIR)
  },
  filename: (req,file,cb)=>{
    cb(null, Date.now() + '_' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
    console.log("Uploaded file type:", file.mimetype); // debug
    if (!file.mimetype.startsWith("image/")) {
        return cb(createErr(400, "Only image files are allowed"), false);
    }
    if (!FILE_TYPE.includes(file.mimetype)) {
        return cb(createErr(400, "File type are not allowed"), false);
    }
    cb(null, true);
};






const uploaduserImage = multer({ storage: userstorage ,
  limits: {fieldSize: MAX_FILE_SIZE},
  fileFilter: fileFilter
})
const uploadproductimage=multer({ storage: productstorage ,
  limits: {fieldSize: MAX_FILE_SIZE},
  fileFilter: fileFilter
})
module.exports= {uploaduserImage, uploadproductimage}