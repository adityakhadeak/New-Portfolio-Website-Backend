import SkillModel from '../../models/SkillModel.js';
import fs from 'fs'
const deleteskill = async (req, res) => {
  try {
    const skill = await SkillModel.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    await SkillModel.findByIdAndRemove(req.params.id);

    const imagePath = `C:/New Volume D/Web Development/Projects/React/Portfolio/client/src/images/uploads/skills/${skill.image}`;
    
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting image file:', err);
      }
    });

    res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default deleteskill;
