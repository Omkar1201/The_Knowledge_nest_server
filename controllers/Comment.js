const mongoose=require('mongoose')
const post=require('../models/Postmodel')
const comment=require('../models/Commentmodel')
const createComment=async(req,res)=>{
    try{
        const{post_id,creater_id,comment_body,created_by}=req.body
        const response=await comment.create({post_id,creater_id,comment_body,created_by})
        const updatedPostData=await post.findByIdAndUpdate(post_id,{$push:{comments:response._id}},{new:true}).populate('likes').populate('comments').exec()
        res.status(200).json({
            success:true,
            comments:updatedPostData.comments,
            updatedPostData,
            message:'comment created successfully'
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

const deletecomment=async(req,res)=>{
    try{
        const{post_id,comment_id}=req.body
        const response=await comment.findByIdAndDelete(comment_id)
        const updatedPostData=await post.findByIdAndUpdate(post_id,{$pull:{comments:comment_id}},{new:true}).populate('likes').populate('comments').exec()
        res.status(200).json({
            success:true,
            updatedPostData,
            message:'comment deleted successfully'
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            messageL:err.message
        })
    }
}

const editComment=async(req,res)=>{
    try{
        const{comment_id,comment_body}=req.body
        const updatedPostData=await comment.findByIdAndUpdate(comment_id,{comment_body},{new:true})
        res.status(200).json({
            success:true,
            updatedPostData,
            message:'Comment updated suceesfully'
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
module.exports={createComment,deletecomment,editComment}