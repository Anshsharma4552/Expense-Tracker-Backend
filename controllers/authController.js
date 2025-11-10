const User=require('../models/User');
const jwt=require('jsonwebtoken');

const generateToken=(userId)=>{
    return jwt.sign({id: userId}, process.env.JWT_SECRET,{
        expiresIn:'24h',
    });
}

// Register User
exports.registerUser=async(req,res)=>{
    const {fullName,email,password,profileImageUrl}=req.body;
    if(!fullName || !email || !password){
        return  res.status(400).json({message:'All fields are required'});
    }
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }
        const user=await User.create({fullName,email,password,profileImageUrl});
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl
            },
            token:generateToken(user._id)
        })
    }catch(err){
        res.status(500).json({message:"Error registering user",error:err.message})
    }
}


// Login User
exports.loginUser=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:'All fields are required'});
    }
    try{
        const user=await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message:'Invalid credentials'});
        }
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImageUrl: user.profileImageUrl
            },
            token:generateToken(user._id)
        })
    }catch(err){
        res.status(500).json({message:"Error logging in user",error:err.message})
    }
}



// getUserInfo User
exports.getUserInfo=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message:"Error fetching user info",error:err.message})
    }
}