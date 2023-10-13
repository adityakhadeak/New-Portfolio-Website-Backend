import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectToDB from './database/db.js'
import routeContact from './routes/contactRoute.js'
import routeUser from './routes/userRoute.js'
const app=express()

dotenv.config()
app.use(express.json())
app.use(cors())
app.use('/api/contact',routeContact)
app.use('/api/user',routeUser)
// app.use('/api/note',route2)


//Connect to Database
ConnectToDB()

const PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Connected to Port ${PORT}`)
})
