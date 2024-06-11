const mongoose=require('mongoose')
const post=require('../models/Postmodel')
const User=require('../models/User')
const Likeschema=new mongoose.Schema(
    {
        post_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        },
        user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        }
    }
)
module.exports=mongoose.model('like',Likeschema)