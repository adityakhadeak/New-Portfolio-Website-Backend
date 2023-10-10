import mongoose from "mongoose";

const aboutSchema=new mongoose.Schema({
    para1:{
        type:String,
        required:true
    },
    para2:{
        type:String,
        required:true
    },
    para3:{
        type:String,
        required:true
    },
    para4:{
        type:String,
        required:true
    }
})

export default mongoose.model('about',aboutSchema)