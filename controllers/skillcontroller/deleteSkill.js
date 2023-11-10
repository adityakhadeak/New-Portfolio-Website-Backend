import SkillModel from '../../models/SkillModel.js';
import { v2 as cloudinary } from 'cloudinary';

const deleteskill = async (req, res) => {
  try {
    const skill = await SkillModel.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ 
        success:false,
        message: 'Skill not found' });
    }
    const result = await cloudinary.uploader.destroy(skill.publicid);
    if (result.result==='ok') {
      await SkillModel.findByIdAndRemove(req.params.id);
      res.status(200).json({success:true,
        message: 'Skill deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default deleteskill;
