import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectToDB from './database/db.js'

const app=express()

dotenv.config()
app.use(express.json())
app.use(cors())

ConnectToDB()

const PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Connected to Port ${PORT}`)
})
