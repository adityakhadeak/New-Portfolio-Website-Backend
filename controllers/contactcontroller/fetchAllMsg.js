import ContactModel from "../../models/ContactModel.js";

const fetchmsg=async(req,res)=>{
    try {
        const msgs=await ContactModel.find({})
        res.send(msgs)
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: "Internal server error"
        })
    }
}

export default fetchmsg