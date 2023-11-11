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

        if (new Date().getTime() / 1000 > data.exp) {
            return res.status(401).json({
              success:false,  
              message: "Token has expired"
            });
          }

        req.user=data.user
        next()
    } catch (error) {
        res.status(401).json({
            message: "Token has expired"
        })
    }
}
export default fetchuser