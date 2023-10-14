import AboutModel from "../../models/AboutModel.js";
import { validationResult } from "express-validator";

const updateabout = async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { para } = req.body
    const updatedData = {}
        if(para) updatedData.para=para 
    
    try {
        const aboutParas = await AboutModel.findById( req.params.id)
        //Checking if the user Exists or not
        if (!aboutParas) {
            return res.status(404).json({
                message: "About Para's Not Found"
            })
        }

        // Update the 'paragraphs' field with the updated data
        const updatedAbout = await AboutModel.findByIdAndUpdate(req.params.id,{$set:updatedData},{new:true})

        res.status(200).json({
            message: "About Section Updated Successfully",
            updatedAbout
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: "Internal server error"
        })
    }
}

export default updateabout