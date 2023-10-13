import UserModel from "../../models/UserModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const logincontroll=async(req,res)=>{
    let success=false
    try {
        const {username,password}=req.body
        const user= await UserModel.findOne(username)
        if (!user) {
            return res.status(404).json({
                success,
                message:"User Not Found"
            })
        }

        const isCorrect=await bcrypt.compare(password,user.password)

        if (!isCorrect) {
            return res.status(400).json({
                success,
                message:"Wrong Password"
            })
        }

        const userData={
            user:{
                id:user.id
            }
        }

        const authtoken= jwt.sign(userData,process.env.JWT_SECRET)
        success=true

        return res.status(200).json({
            success,
            message:"User Logged",
            authtoken
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
        success,
        message:"Internal Server Error"
        })
    }
}

export default logincontroll