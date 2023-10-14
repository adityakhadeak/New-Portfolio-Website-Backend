import ExpModel from "../../models/ExpModel.js";
import { validationResult } from "express-validator";
const updateexp = async (req, res) => {
   
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {duration,title,company,techstack,link,doc} = req.body

    const newExp={}
    if(duration)newExp.duration=duration
    if(title)newExp.title=title
    if(company)newExp.company=company
    if(techstack)newExp.techstack=techstack
    if(link)newExp.link=link
    if(doc)newExp.doc=doc
   
    try {
        const experience = await ExpModel.findById(req.params.id)
        //Checking if the experiences Exists or not
        if (!experience) {
            return res.status(404).json({
                message: "experience  Not Found"
            })
        }

        // Update the 'paragraphs' field with the updated data

        const updatedExp= await ExpModel.findByIdAndUpdate(req.params.id,{$set:newExp},{new:true})

        res.status(200).json({
            message: "experience Detail Updated Successfully",
            updatedExp
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: "Internal server error"
        })
    }
}

export default updateexp