import mongoose from "mongoose";

const eduSchema=new mongoose.Schema({
    year:{
        type:String,
        required:true
    },
    clg:{
        type:String,
        required:true
    },
    edu:{
        type:String,
        required:true
    },
    sts:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    }
    
})

export default mongoose.model('edu',eduSchema)