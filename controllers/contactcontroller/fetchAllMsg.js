import ContactModel from "../../models/ContactModel.js";

const fetchmsg=async(req,res)=>{
    try {
        const msgs=await ContactModel.find({})
        res.status(200).json({
            success:true,
            data:msgs
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: "Internal server error"
        })
    }
}

export default fetchmsg