import express from 'express'
import { body } from 'express-validator'
import ExpModel from '../models/ExpModel.js'
import addexp from '../controllers/expcontroller/addExp.js';
import updateexp from '../controllers/expcontroller/updateExp.js';
import fetchuser from '../middleware/fetchUser.js';
import deleteexp from '../controllers/expcontroller/deleteExp.js';

const routerExp= express()

//creating the route for Add About 
routerExp.post("/addexp",fetchuser,addexp);

//creating the route for Fetch About 
routerExp.get("/fetchexp",fetchuser,async(req,res)=>{
    try {
        const experience=await ExpModel.find({})
        if (!experience) {
            return res.status(404).json({
                success:false,
                message:"Eduction Detail Not Found"
            })
        }
        res.status(200).json({
            success:true,
            data:experience
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message: "Internal server error"
        })
    }
});

routerExp.delete("/deleteexp/:id",fetchuser,deleteexp)

//creating the route for Update About 
routerExp.put("/updateexp/:id",[
    [
        body('duration', "All the field should be filled").isLength({ min: 1 }),
        body('title',  "All the field should be filled").isLength({ min: 1 }),
        body('company',  "All the field should be filled").isLength({ min: 1 }),
        body('techstack',  "All the field should be filled").isLength({ min: 1 }),
        body('link',  "All the field should be filled").isLength({ min: 1 }),
        body('doc',  "All the field should be filled").isLength({ min: 1 }),
      ]
  ],fetchuser,updateexp);

export default routerExp