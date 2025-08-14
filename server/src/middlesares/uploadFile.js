require('dotenv').config()
const multer= require("multer")
createErr= require("http-errors")
const { FILE_TYPE, MAX_FILE_SIZE}= require("../config/index")



const storage = multer.memoryStorage()

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






const uploaduserImage = multer({ storage: storage ,
  storage: storage,
  fileFilter: fileFilter
})

module.exports= {uploaduserImage}