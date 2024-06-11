const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const signup=async(req,res)=>{
    try{
        const {username,email,password}=req.body

        const isuserpresent=await User.findOne({email})
        // Check is user already present
        if(isuserpresent){
            res.status(409).json({
                success:false,
                message:'User is already present'
            })
            return;
        }
        
        // Hash password
        let hashedpassword;
        try{
            hashedpassword=await bcrypt.hash(password,10);
        }
        catch(err){
            res.status(500).json({
                success:false,
                message:`Unable to hash the password ${err.message}`
            })
        }
        
        const userdata=await User.create({username,email,password:hashedpassword})
        res.status(200).json({
            success:true,
            message:'Sign up successful'
        })
    }
    catch(err){
        console.log(`Error occured - ${err}`);
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
const login=async(req,res)=>{
    try{
        const{email,password}=req.body
        const userdata=await User.findOne({email})
        if(!userdata)
        {
            res.status(404).json({
                success:false,
                message:'user not found'
            })
        }

        // ispasswordmatched
        const ispasswordmatched=await bcrypt.compare(password,userdata.password)
        if(ispasswordmatched)
        {

            const payload={
                username:userdata.username,
                email:userdata.email,
                user_id:userdata._id
            }

            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'2h'})
            const options={
                expires:new Date(Date.now()+1000*60*2),
                httpOnly:true
            }

            res.cookie('mycookies',token,options).status(200).json({
                success:true,
                token,
                email:userdata.email.toString(),
                user_id:userdata._id,
                username:userdata.username,
                message:`Login successfull ( Hi ${userdata.username})`
            })
        }
        else{

            res.status(401).json({
                success:false,
                message:'password did not match'
            })
        }
    }
    catch(err){

    }
}
module.exports={signup,login}


