import mongoose from "mongoose";

const skillSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    publicid:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
})

export default mongoose.model('skill',skillSchema)