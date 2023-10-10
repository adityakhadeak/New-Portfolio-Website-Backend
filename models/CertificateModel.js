import mongoose from "mongoose";

const certificateSchema=new mongoose.Schema({
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
        "1st":String
    },
    doc:{
        type:String,
        required:true
    }
})

export default mongoose.model('certificate',certificateSchema)