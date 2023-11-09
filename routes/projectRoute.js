import express from 'express'
import ProjectModel from '../models/ProjectModel.js'
import fetchuser from '../middleware/fetchUser.js'
import addproject from '../controllers/projectcontroller/addProject.js'

const routerProject=express()

//Route to add skills 
routerProject.post('/addproject',fetchuser,addproject)

//Route to fetch skills 
routerProject.get('/fetchprojects',fetchuser,async(req,res)=>{
  try {
    const projects=await ProjectModel.find({})
    if (!projects) {
        return res.status(404).json({
            message:"Project Detail Not Found"
        })
    }
    res.send(projects)
} catch (error) {
    console.log(error)
    res.status(400).json({
        message: "Internal server error"
    })
}
})

//Route to delete skills 
// routerProject.delete("/deletesproject/:id",fetchuser,deleteproject)

export default routerProject