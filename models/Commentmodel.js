const mongoose=require('mongoose')
const post=require('../models/Postmodel')
const User=require('../models/User')
const Commentschema=new mongoose.Schema(
    {
        post_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        },
        creater_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        comment_body:{
            type:String,
            required:true
        },
        created_by:{
            type:String,
            required:true
        }
    }
)
module.exports=mongoose.model('comment',Commentschema)