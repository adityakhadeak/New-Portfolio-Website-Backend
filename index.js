import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectToDB from './database/db.js'
import {v2 as cloudinary} from 'cloudinary';
import fileUpload from 'express-fileupload';
import routeContact from './routes/contactRoute.js'
import routeUser from './routes/userRoute.js'
import routerAbout from './routes/aboutRoutes.js'
import routerEdu from './routes/eduRoute.js'
import routerExp from './routes/expRoute.js'
import routerCer from './routes/certificateRoute.js'
import routerSkill from './routes/skillRoute.js'
import routerProject from './routes/projectRoute.js'
const app=express()

dotenv.config()
app.use(fileUpload({
    useTempFiles:false
}))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(
  cors({
    origin: [
      "https://www.adityakhade.tech",
      // "http://localhost:3000"
    ],
  })
);

app.use('/api/contact',routeContact)
app.use('/api/user',routeUser)
app.use('/api/about',routerAbout)
app.use('/api/edu',routerEdu)
app.use('/api/exp',routerExp)
app.use('/api/cer',routerCer)
app.use('/api/skill',routerSkill)
app.use('/api/project',routerProject)


//Connect to Database
ConnectToDB()

          
cloudinary.config({ 
  cloud_name: process.env.ClOUDINARY_CLIENT_NAME, 
  api_key: process.env.ClOUDINARY_CLIENT_API, 
  api_secret: process.env.ClOUDINARY_CLIENT_SECRET 
});

const PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Connected to Port ${PORT}`)
})
