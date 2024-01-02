import { v2 as cloudinary } from 'cloudinary';
import AchievementModel from '../../models/AchievementModel.js';
const deleteachievement=async(req,res)=>{
    try {
        const achievement = await AchievementModel.findById(req.params.id);
    
        if (!achievement) {
          return res.status(404).json({ 
            success:false,
            message: 'Achievement not found' 
          });
        }
    
        const result = await cloudinary.uploader.destroy(achievement.publicid);
        if (result.result==='ok') {
          await AchievementModel.findByIdAndRemove(req.params.id);
          res.status(200).json({success:true,
            message: 'Achievement deleted successfully' });
        }
      } catch (error) {
        console.error('Error deleting achievement:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    };
    
export default deleteachievement