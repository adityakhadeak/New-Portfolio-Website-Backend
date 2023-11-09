import { trusted } from "mongoose";
import EduModel from "../../models/EduModel.js";

const updateedu = async (req, res) => {
   
    const {year,clg,edu,sts,link} = req.body

    const newEdu={}
    if(year)newEdu.year=year
    if(clg)newEdu.clg=clg
    if(edu)newEdu.edu=edu
    if(sts)newEdu.sts=sts
    if(link)newEdu.link=link
   
    try {
        const education = await EduModel.findById(req.params.id)
        //Checking if the Educations Exists or not
        if (!education) {
            return res.status(404).json({
                success:false,
                message: "Education  Not Found"
            })
        }

        // Update the 'paragraphs' field with the updated data

        const updatedEdu= await EduModel.findByIdAndUpdate(req.params.id,{$set:newEdu},{new:true})

        res.status(200).json({
            success:true,
            message: "Education Detail Updated Successfully",
            updatedData:updatedEdu
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: "Internal server error"
        })
    }
}

export default updateedu