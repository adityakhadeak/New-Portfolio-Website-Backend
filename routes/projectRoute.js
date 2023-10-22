import express from 'express'
import ProjectModel from '../models/ProjectModel.js'
import fetchuser from '../middleware/fetchUser.js'
import multer from 'multer'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import addproject from '../controllers/projectcontroller/addProject.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const routerProject=express()

routerProject.use(bodyParser.json())
routerProject.use(bodyParser.urlencoded({extended:true}))
routerProject.use(express.static('../../client/src/images/uploads/projects'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname,'../../client/src/images/uploads/projects'),(error,succes)=>{
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
routerProject.post('/addproject',fetchuser,upload.single('image'),addproject)

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