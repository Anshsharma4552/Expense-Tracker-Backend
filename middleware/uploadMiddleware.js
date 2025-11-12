const multer = require('multer');

// Use memory storage for serverless deployment
const storage = multer.memoryStorage();

const fileFilter=(req,file,cb)=>{
    const allowedTypes=['image/jpeg','image/jpg','image/png'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Invalid file type. Only JPEG, PNG files are allowed.'),false);
    }
}
const upload = multer({
    storage, 
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
})
module.exports=upload;