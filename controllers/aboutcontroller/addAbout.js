import AboutModel from "../../models/AboutModel.js";
import { validationResult } from "express-validator";

const addabout = async (req, res) => {
   
    const aboutData = req.body
    try {

        if (!aboutData || aboutData.length === 0) {
            return res.status(400).json({
                message: "Invalid About details provided."
            });
        }
        const user = req.user.id; // Assuming you have access to the user's ID

        for (const aboutObj of aboutData) {

            const newAbout = new AboutModel({
                user,
                para: aboutObj.para
            })

            const savedAbout = await newAbout.save()

            console.log(savedAbout)
        }
        res.status(201).json({
            message: "About Details Added Successfully",
        });

    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: "Internal server error"
        })
    }
}

export default addabout