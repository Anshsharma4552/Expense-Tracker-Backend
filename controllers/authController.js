const User=require('../models/User');
const jwt=require('jsonwebtoken');

const generateToken=(user)=>{
    return jwt.sign({id
    }, process.env.JWT_SECRET,{
        expiresIn:'1h',
    });
}

// Register User
exports.registerUser=async(req,res)=>{}


// Login User
exports.loginUser=async(req,res)=>{}



// getUserInfo User
exports.getUserInfo=async(req,res)=>{}