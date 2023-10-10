import mongoose from 'mongoose'

const ConnectToDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to mongodb successfully")
    } catch (error) {
        console.log('Cannot connect to MONGODB'+error)
    }
}

export default ConnectToDB