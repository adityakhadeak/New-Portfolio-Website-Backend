import mongoose from "mongoose";

const userDetailsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    prof:{
        "1st":String,
        "2nd":String,
        "3rd":String,
        "4th":String,
    },
    currentsts:{
        type:String,
    },
    publicid:{
        type:String,
        required:true
    },
    userimage:{
        type:String,
        required:true
    }
})

export default mongoose.model('userdetails',userDetailsSchema)