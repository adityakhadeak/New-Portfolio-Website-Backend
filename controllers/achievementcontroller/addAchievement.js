import AchievementModel from "../../models/AchievementModel.js"
import { v2 as cloudinary } from 'cloudinary';

const addachievement=async(req,res)=>{
try {
    const achievement=req.body
    const uploadedFile=req.files.image
    const base64DataUrl = `data:${uploadedFile.mimetype};base64,${uploadedFile.data.toString('base64')}`;
    const savedAchievements = []
    await cloudinary.uploader.upload(base64DataUrl,async(err,result)=>{
        const AchievementData=new AchievementModel({
            title:achievement.title,
            platform:achievement.platform,
            publicid:result.public_id,
            image:result.secure_url
        })

        const savedAchievement=AchievementData.save()
        savedAchievements.push(savedAchievement)
        
        res.status(201).json({
            success: true,
            message: 'Achievement added successfully',
            data: savedAchievements
        })
    })

} catch (error) {
    res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
}
}
export default addachievement