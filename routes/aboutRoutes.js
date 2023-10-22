import express from 'express'
import { body } from 'express-validator'
import AboutModel from '../models/AboutModel.js'
import fetchuser from '../middleware/fetchUser.js'
import addabout from '../controllers/aboutcontroller/addAbout.js'
import updateabout from '../controllers/aboutcontroller/updateAbout.js'

const routerAbout = express()

//creating the route for Add About 
routerAbout.post("/addabout", fetchuser, addabout);

//creating the route for Fetch About 
routerAbout.get("/fetchabout", fetchuser, async (req, res) => {
    try {
        const aboutParas = await AboutModel.find({})
        if (!aboutParas) {
            return res.status(404).json({
                success: false,
                message: "About Not Found"
            })
        }
        res.status(200).json({
            success: true,
            data: aboutParas
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Internal server error"
        })
    }
});

//creating the route for Update About 
routerAbout.put("/updateabout/:id", [
    body('para', "About Paragraph should be atleast of 30 lenght").isLength({ min: 30 }),

], fetchuser, updateabout);


routerAbout.delete("/deleteabout/:id", fetchuser, async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const para = await AboutModel.findById(id);
        if (!para) {
            res.status(404).json({
                success: false,
                message: "Paragraph does not found"
            })
        }
        const toBeDeleted = await AboutModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Paragraph deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Internal server error"
        })
    }
});

export default routerAbout