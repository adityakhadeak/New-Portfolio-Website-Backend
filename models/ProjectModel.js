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
       type:String,
       require:true
    },
    links: {
        github: String,
        live: String,
      },
    publicid:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
})

export default mongoose.model('project',projectSchema)