import mongoose from "mongoose";

const skillSchema=new mongoose.Schema({
    skillname:{
        type:String,
        required:true
    }
})

export default mongoose.model('skill',skillSchema)