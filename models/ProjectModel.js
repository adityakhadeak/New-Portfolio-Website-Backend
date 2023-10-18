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
    tools:{
        "1st":String,
        "2nd":String,
        "3rd":String,
        "4th":String,

    },
    links: {
        github: String,
        live: String,
      },
    image:{
        type:String
    }
})

export default mongoose.model('project',projectSchema)