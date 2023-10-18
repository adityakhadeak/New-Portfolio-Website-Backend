import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectToDB from './database/db.js'
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
app.use(express.json())
app.use(cors())
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

const PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Connected to Port ${PORT}`)
})
