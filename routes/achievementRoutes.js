import express from "express";
import addachievement from "../controllers/achievementcontroller/addAchievement.js";
import fetchuser from "../middleware/fetchUser.js";
import AchievementModel from "../models/AchievementModel.js";
import deleteachievement from "../controllers/achievementcontroller/deleteAchievement.js";

const routerAchieve=express();
//route for adding achievement
routerAchieve.post('/addachievement',fetchuser,addachievement)

routerAchieve.get('/fetchachievement',async(req,res)=>{
    try {
        const achievements= await AchievementModel.find({})
    if (!projects) {
        return res.status(404).json({
            success:false,
            message:"No Achievements"
        })
    }

    res.status(200).json({
        success:true,
        message:"Achievements Fetched",
        data:achievements
    })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message: "Internal server error"
        })
    }
})

// Route to delete achievement 
routerAchieve.delete("/deleteachievement/:id",fetchuser,deleteachievement)