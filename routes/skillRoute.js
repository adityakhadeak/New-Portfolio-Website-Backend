import express from 'express'
import SkillModel from '../models/SkillModel.js'
import fetchuser from '../middleware/fetchUser.js'
import addskill from '../controllers/skillcontroller/addSkills.js'
import multer from 'multer'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import deleteskill from '../controllers/skillcontroller/deleteSkill.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const routerSkill=express()

routerSkill.use(bodyParser.json())
routerSkill.use(bodyParser.urlencoded({extended:true}))
routerSkill.use(express.static('../../client/src/images/uploads/skills'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname,'../../client/src/images/uploads/skills'),(error,succes)=>{
        if(error) throw error
      }); // Set the destination for image uploads
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname,(error,success)=>{
        if(error)throw error
      });
    },
  });

  const fileFilter=(req, file, cb)=>{
    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
        cb(null,true);
    }else{
        cb(null, false);
    }
  
   }

  const upload = multer({ storage:storage, fileFilter:fileFilter });



//Route to add skills 
routerSkill.post('/addskills',fetchuser,upload.single('image'),addskill)

//Route to fetch skills 
routerSkill.get('/fetchskills',fetchuser,async(req,res)=>{
  try {
    const skills=await SkillModel.find({})
    if (!skills) {
        return res.status(404).json({
            message:"Eduction Detail Not Found"
        })
    }
    res.send(skills)
} catch (error) {
    console.log(error)
    res.status(400).json({
        message: "Internal server error"
    })
}
})

//Route to delete skills 
routerSkill.delete("/deleteskill/:id",fetchuser,deleteskill)

export default routerSkill