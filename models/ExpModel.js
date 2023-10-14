import mongoose from "mongoose";

const expSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        unique:false
    },
    duration:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    techstack:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    doc:{
        type:String,
        required:true
    },
    
})

export default mongoose.model('exp',expSchema)