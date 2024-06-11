const like=require('../models/Likemodel')
const post=require('../models/Postmodel')
const createlike=async(req,res)=>{
    try{
        const{post_id,user_id}=req.body
        const{username,email}=req.user
        const response=await like.create({post_id,user_id,username,email})
        let updateresponse=await post.findByIdAndUpdate(post_id,{$push:{likes:response._id}},{new:true}).populate('comments').populate('likes').exec()
        res.status(200).json({
            success:true,
            updateresponse:updateresponse,
            message:'liked succesfully'
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
const unlike=async(req,res)=>{
    try{
        const{post_id,user_id}=req.body
        const response=await like.findOneAndDelete({post_id,user_id})
        const updateresponse=await post.findByIdAndUpdate(post_id,{$pull:{likes:response._id}},{new:true}).populate('comments').populate('likes').exec()
        res.status(200).json({
            success:true,
            updateresponse,
            message:'Unliked sucessfully'
        })
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
module.exports={createlike,unlike}