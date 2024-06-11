const mongoose = require('mongoose')
const like=require('../models/Likemodel')
const comment=require('../models/Commentmodel')
const User=require('../models/User')
const Postschema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        creater_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        category:{
            type: String,
            required: true
        },
        created_at:{
            type:Date,
            required:true
        },
        image: {
            type: String, // Store the URL or reference to the image
            default: null  
        },
        savedby:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }],
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'like'
        }],
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }]
    }
)
module.exports=mongoose.model('Post',Postschema)