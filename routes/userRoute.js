const express=require('express')
const router=express.Router()
const {signup,login}=require('../controllers/Auth')
const {auth}=require('../middleware/auth')
const {createpost,getAllpost,getMyposts,deletepost,editpost,getCategoryPosts,savedposts}=require('../controllers/Post')
const {createlike,unlike}=require('../controllers/Like')
const {createComment,deletecomment,editComment}=require('../controllers/Comment')
const {DeleteAccount}=require('../controllers/DeleteAccount')

router.delete('/deletepost',auth,deletepost)
router.delete('/deletecomment',auth,deletecomment)
router.delete('/deleteaccount',DeleteAccount)

router.put('/editpost',auth,editpost);
router.put('/editcomment',auth,editComment);
router.put('/savedpost',auth,savedposts)

router.post('/signup',signup)
router.post('/signin',login)
router.post('/createpost',auth,createpost)
router.post('/like',auth,createlike)
router.post('/unlike',auth,unlike)
router.post('/createcomment',auth,createComment)
router.post('/category',getCategoryPosts)

router.get('/home',getAllpost)

router.get('/profile',auth,getMyposts)
router.get('/',auth,(req,res)=>{
    res.status(200).json({
        success:true,
        user_id:req.user.user_id,
        username:req.user.username,
        email:req.user.email,
        message:'You are verified'
    })
})
router.get('/profile',auth,(req,res)=>{
    res.status(200).json({
        success:true,
        message:'You can see your profile'
    })
})
router.get('/test',auth,(req,res)=>{
    res.status(200).json({
        success:true,
        message:'Welcome to protected route for test'
    })
})
router.get('/createpost',auth,(req,res)=>{
    res.status(200).json({
        success:true,
        message:'You can write post now'
    })
})
module.exports=router