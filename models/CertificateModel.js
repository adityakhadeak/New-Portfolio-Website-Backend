import mongoose from "mongoose";

const certificateSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        unique:false
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    platform:{
        type:String,    
        required:true
    },
    label:{
        type:String,    
        required:true
    },
    doc:{
        type:String,
        required:true
    }
})

export default mongoose.model('certificate',certificateSchema)