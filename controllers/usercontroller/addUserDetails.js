import UserDetailsModel from "../../models/UserDetailsModel.js";
import { v2 as cloudinary } from 'cloudinary';

const adduserdetails = async(req,res)=>{

    const userData=req.body
    const uploadedFile = req.files.image
    const base64DataUrl = `data:${uploadedFile.mimetype};base64,${uploadedFile.data.toString('base64')}`;

    try {
        const savedData = []
        await cloudinary.uploader.upload(base64DataUrl, async (err, result) => {
          const userDetailsData = new UserDetailsModel({
            name: userData.name,
            prof: {
              "1st": userData.profone,
              "2nd": userData.proftwo,
              "3rd": userData.profthree,
              "4th": userData.proffour,
            },
            currentsts: userData.currentsts,
            publicid:result.public_id,
            userimage: result.secure_url // Access the uploaded file path using req.files[i]
          });
    
          const Data = await userDetailsData.save();
          savedData.push(Data)
    
          res.status(201).json({
            success: true,
            message: 'User Data added successfully',
            data: savedData
          });
    
        })
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
}
export default adduserdetails