import mongoose, { model } from "mongoose";

const achievementSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    platform:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    publicid:{
        type:String,
        required:true
    }
})
export default mongoose.model('achievement',achievementSchema);