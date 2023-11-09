import ContactModel from "../../models/ContactModel.js";
import { validationResult } from 'express-validator'

const addMsg= async(req,res)=>{

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name,email,msg}=req.body

    try {
        const newmsg = new ContactModel({
            name,email,msg
        })
        const sendMsg=await newmsg.save()
        res.status(200).json({
            success:true,
            msg:sendMsg
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: "Internal server error"
        })
    }
}

export default addMsg