import express from 'express'
import SkillModel from '../models/SkillModel.js'
import fetchuser from '../middleware/fetchUser.js'
import addskill from '../controllers/skillcontroller/addSkills.js'
import deleteskill from '../controllers/skillcontroller/deleteSkill.js'


const routerSkill = express()

//Route to add skills 
routerSkill.post('/addskills', fetchuser, addskill)

//Route to fetch skills 
routerSkill.get('/fetchskills', async (req, res) => {
  try {
    const skills = await SkillModel.find({})
    if (!skills) {
      return res.status(404).json({
        success: false,
        message: "Eduction Detail Not Found"
      })
    }
    res.status(200).json({
      success: true,
      message: "Education Details Fetched",
      data: skills
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: "Internal server error"
    })
  }
})

//Route to delete skills 
routerSkill.delete("/deleteskill/:id", fetchuser, deleteskill)

export default routerSkill