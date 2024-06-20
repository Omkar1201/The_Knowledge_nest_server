const like = require('../models/Likemodel')
const post = require('../models/Postmodel')
const comment = require('../models/Commentmodel')
const user = require('../models/User')
const DeleteAccount = async (req, res) => {
    try {
        const { user_id } = req.user;
        const deleteduser = await user.findByIdAndDelete(user_id);
        const allpost = await post.find({}).populate('likes').populate('comments').exec()
        allpost.map(async (data) => (
            data.comments.map(async (commentData) => (
                user_id == commentData.creater_id && (
                    await comment.findByIdAndDelete(commentData._id),
                    await post.findByIdAndUpdate(data._id,{$pull:{comments:user_id}},{new:true})
                )
            )),
            data.likes.map(async (likeData) => (
                user_id == likeData.user_id && (
                    await like.findByIdAndDelete(likeData._id),
                    await post.findByIdAndUpdate(data._id, { $pull: { likes: user_id } }, { new: true })
                )
            )),

            data.savedby.includes(user_id) &&
            await post.findByIdAndUpdate(data._id, { $pull: { savedby: user_id } }, { new: true })
        ))
        while (await post.findOne({ creater_id: user_id })) {
            const deletedpost = await post.findOneAndDelete({ creater_id: user_id })
            deletedpost.comments.map(async (commentId) => (
                await comment.findByIdAndDelete(commentId)
            ))
            deletedpost.likes.map(async (likeId) => (
                await like.findByIdAndDelete(likeId)
            ))
        }
        res.send({
            success: true,
            deleteduser,
            message: `Account of ${deleteduser.username} is deleted successfully!!`
        })
        // const deletedposts=await post.find
    }
    catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}
module.exports = { DeleteAccount }