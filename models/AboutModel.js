import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        unique: false
    },
    para: {
        type: String,
        required: true
    },


})

export default mongoose.model('about', aboutSchema)