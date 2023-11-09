import express from 'express'
import { body } from 'express-validator'
import EduModel from '../models/EduModel.js'
import fetchuser from '../middleware/fetchUser.js';
import addedu from '../controllers/educontroller/addedu.js';
import updateedu from '../controllers/educontroller/updateEdu.js';
import deleteedu from '../controllers/educontroller/deleteEdu.js';


const routerEdu= express()

//creating the route for Add About 
routerEdu.post("/addedu",
[
    body('year', "All the field should be filled").isLength({ min: 5 }),
    body('clg',  "All the field should be filled").isLength({ min: 5 }),
    body('edu',  "All the field should be filled").isLength({ min: 5 }),
    body('sts',  "All the field should be filled").isLength({ min: 5 }),
    body('link',  "All the field should be filled").isLength({ min: 5 }),
  ]
,fetchuser,addedu);

//creating the route for Fetch About 
routerEdu.get("/fetchedu",fetchuser,async(req,res)=>{
    try {
        const eductions=await EduModel.find({})
        if (!eductions) {
            return res.status(404).json({
                success:false,
                message:"Eduction Detail Not Found"
            })
        }
        res.status(200).json({
            success:true,
            data:eductions
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Internal server error"
        })
    }
});

routerEdu.delete("/deleteedu/:id",fetchuser,deleteedu)
//creating the route for Update About 
routerEdu.put("/updateedu/:id",fetchuser,updateedu);

export default routerEdu