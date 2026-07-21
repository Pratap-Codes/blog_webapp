import multer from "multer"

const storage = multer.memoryStorage()

const fileFilter = (req, res, cb) =>{
    const allowedTypes = ["images/jpeg", "image/png", "image/webp"];
    if(allowedTypes.includes((file.mimetype))){
        cb(null, true)
    }else{
        cb(new error("Only JPEG, PNG and WEBP images are allowed"), false)
    }
}
export const singleUpload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize: 5 * 1024 * 1024
    }
}).single("file")