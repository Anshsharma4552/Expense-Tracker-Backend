const express = require('express');
const path = require('path');
const { protect } = require(path.join(__dirname, '../middleware/authMiddleware'));    
const upload = require(path.join(__dirname, '../middleware/uploadMiddleware'));
const {
    registerUser,
    loginUser,
    getUserInfo,
    updateUserProfile
} = require(path.join(__dirname, '../controllers/authController'));

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/getuser',protect,getUserInfo);
router.put('/update-profile',protect,updateUserProfile);

router.post("/upload-image",upload.single("image"),(req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"});
    }
    const imageUrl=`${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({imageUrl});
})
module.exports=router;