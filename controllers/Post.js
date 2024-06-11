const mongoose = require('mongoose')
const post = require('../models/Postmodel')
const comment = require('../models/Commentmodel')
const like = require('../models/Likemodel')
const createpost = async (req, res) => {
    try {
        const { formdata, creater_id, image, created_at } = req.body
        const { title, body, category } = formdata
        const { email, username } = req.user
        // console.log(image);
        const response = await post.create({ email, title, body, username, creater_id, category, created_at, image })
        res.status(200).json({
            success: true,
            response,
            message: 'Post created successfully'
        })
    }
    catch (err) {
        console.log(`error - ${err}`);
        res.status(500).json({
            success: false,
            message: err
        })
    }
}
const getAllpost = async (req, res) => {
    try {
        const allpost = await post.find({}).populate('likes').populate('comments').exec()
        res.status(200).json({
            success: true,
            Allpost: allpost
        })
    }
    catch (err) {
        console.log(`Error- ${err.message}`);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const getMyposts = async (req, res) => {
    try {
        const { user_id } = req.body
        const myposts = await post.find({ user_id })
        res.status(200).json({
            success: true,
            myposts,
            message: 'You got your posts'
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const deletepost = async (req, res) => {
    try {
        // console.log(req.body);
        const { post_id } = req.body
        const deletedpost = await post.findByIdAndDelete(post_id)
        deletedpost.comments.map(async (commentId) => (
            await comment.findByIdAndDelete(commentId)
        ))
        deletedpost.likes.map(async (likeId) => (
            await like.findByIdAndDelete(likeId)
        ))
        // console.log(deletedpost.comments);
        res.status(200).json({
            success: true,
            deletedpost,
            message: 'post deleted successfully'
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const editpost = async (req, res) => {
    try {
        const { title, body, post_id, created_at, category, image } = req.body
        const updatedPostData = await post.findByIdAndUpdate(post_id, { title, body, created_at, category, image }, { new: true }).populate('likes').populate('comments').exec()
        res.status(200).json({
            success: true,
            updatedPostData,
            message: 'Post updated suceesfully'
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const getCategoryPosts = async (req, res) => {
    try {
        const { category } = req.body
        const response = await post.find({ category: category }).populate('comments').exec()
        res.status(200).json({
            success: true,
            response,
            message: `posts got with category ${category}`
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
const savedposts = async (req, res) => {
    try {
        const { post_id, user_id, saved } = req.body;
        var updatedPostData;
        if (saved) {
            updatedPostData = await post.findByIdAndUpdate(post_id, { $push: { savedby: user_id } }, { new: true }).populate('likes').populate('comments').exec()
        }
        else {
            updatedPostData = await post.findByIdAndUpdate(post_id, { $pull: { savedby: user_id } }, { new: true }).populate('likes').populate('comments').exec()
        }
        res.status(200).json({
            success: true,
            updatedPostData,
            message: `Post ${saved ? 'saved' : 'unsaved'} successfully!`
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
module.exports = { createpost, getAllpost, getMyposts, deletepost, editpost, getCategoryPosts, savedposts }