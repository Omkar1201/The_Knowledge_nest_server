require('dotenv').config()
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        // console.log(token);
        if (!token || token==='null') {
            return res.status(401).json({
                success: false,
                message: 'Token not found'
            })
        }
        else {
            try {
                const payload = jwt.verify(token, process.env.JWT_SECRET)
                req.user = payload
                next()
            }
            catch (err) {
                res.status(401).json({
                    success: false,
                    message: 'Token Invalid'
                })
            }
        }

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
module.exports = { auth }