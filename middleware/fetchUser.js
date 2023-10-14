import UserModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken'

const fetchuser=async(req,res,next)=>{
    const authtoken=req.header('auth-token')
    try {
        if (!authtoken) {
            res.status(401).json({
                message:"Please Validate Using Valid Token"
            })
        }
        const data = jwt.verify(authtoken,process.env.JWT_SECRET)
        req.user=data.user
        next()
    } catch (error) {
        res.status(401).json({
            message:"Please Validate Using Valid Token"
        })
    }
}
export default fetchuser