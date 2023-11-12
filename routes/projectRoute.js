import express from 'express'
import ProjectModel from '../models/ProjectModel.js'
import fetchuser from '../middleware/fetchUser.js'
import addproject from '../controllers/projectcontroller/addProject.js'
import deleteproject from '../controllers/projectcontroller/deleteProject.js'

const routerProject=express()

//Route to add skills 
routerProject.post('/addproject',fetchuser,addproject)

//Route to fetch skills 
routerProject.get('/fetchprojects',async(req,res)=>{
  try {
    const projects=await ProjectModel.find({})
    if (!projects) {
        return res.status(404).json({
            success:false,
            message:"Project Detail Not Found"
        })
    }
    res.status(200).json({
        success:true,
        message:"Project Added Successfully",
        data:projects
    })
} catch (error) {
    console.log(error)
    res.status(400).json({
        success:false,
        message: "Internal server error"
    })
}
})

// Route to delete skills 
routerProject.delete("/deleteproject/:id",fetchuser,deleteproject)

export default routerProject