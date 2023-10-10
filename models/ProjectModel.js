import mongoose from "mongoose";

const projectSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    tool:{
        "1st":String,
        "2nd":String,
        "3rd":String,

    },
    links: {
        github: String,
        live: String,
      },
    
})

export default mongoose.model('project',projectSchema)