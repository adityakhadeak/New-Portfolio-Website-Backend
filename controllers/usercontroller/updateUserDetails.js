import UserDetailsModel from "../../models/UserDetailsModel.js";
import { v2 as cloudinary } from 'cloudinary';

const updateuserdetails = async (req, res) => {

    const updatedData = req.body
    const uploadedFile = req.files.image
    const base64DataUrl = `data:${uploadedFile.mimetype};base64,${uploadedFile.data.toString('base64')}`;

    const newExp = {name:"",prof:{'1st':'','2nd':'','3rd':'','4th':''},currentsts:""}
    if (updatedData.name) newExp.name = updatedData.name
    if (updatedData.profone) newExp.prof['1st'] = updatedData.profone
    if (updatedData.proftwo) newExp.prof['2nd'] = updatedData.proftwo
    if (updatedData.profthree) newExp.prof['3rd'] = updatedData.profthree
    if (updatedData.proffour) newExp.prof['4th'] = updatedData.prfourne
    if (updatedData.currentsts) newExp.currentsts = updatedData.currentsts

    try {
        const details = await UserDetailsModel.findById(req.params.id)
        //Checking if the experiences Exists or not
        if (!details) {
            return res.status(404).json({
                success: false,
                message: "Details Not Found"
            })
        }

        const result = await cloudinary.uploader.destroy(details.publicid);
        if (result.result === 'ok') {
            await cloudinary.uploader.upload(base64DataUrl, async (err, result) => {
                newExp.publicid = result.public_id,
                    newExp.userimage = result.secure_url
                const updatedDetails = await UserDetailsModel.findByIdAndUpdate(req.params.id, { $set: newExp }, { new: true })
                res.status(200).json({
                    success: true,
                    message: "Detail Updated Successfully",
                    updatedData: updatedDetails
                })
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export default updateuserdetails