import SkillModel from '../../models/SkillModel.js';
import fs from 'fs'
const deleteskill = async (req, res) => {
  try {
    // Assuming you are sending the _id of the document you want to delete in the request parameters.
    // Find the document by its _id.
    const skill = await SkillModel.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    // Delete the document from MongoDB.
    await SkillModel.findByIdAndRemove(req.params.id);

    // Remove the corresponding image file from your server's file system.
    // You will need the file path or filename that matches the 'image' field in your SkillModel.
    const imagePath = `uploads/${skill.image}`;
    // You may want to check if the file exists before attempting to delete it.
    // Use the 'fs' module to delete the file.
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
