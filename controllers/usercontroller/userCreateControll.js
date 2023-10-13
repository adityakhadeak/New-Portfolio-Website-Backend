import UserModel from "../../models/UserModel.js";
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'

const createuser = async(req,res)=>{

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name,email,username,password}=req.body
    let success=false
    try {
        const existingUser = await UserModel.findOne({email})
        
        if (existingUser) {
            return res.json({
                success,
                message:"User with this email already exist"
            })
        }

        const salt= await bcrypt.genSalt(10)
        const encryptedPass=await bcrypt.hash(password,salt)

        const user= new UserModel({
            name,email,username,password:encryptedPass
        })
    
        await user.save()
    
        return res.status(200).json({
            success,
            message:"Registered Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status:'failed',
            message:'Internal server error'
        })
    }
}
export default createuser