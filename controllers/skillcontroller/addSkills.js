import SkillModel from "../../models/SkillModel.js";
import { v2 as cloudinary } from 'cloudinary';

const addskill = async (req, res) => {
  try {
    const skills = req.body;
    const file = req.files.image
    let savedSkills = [];

    await cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      const skillData = new SkillModel({
        name: skills.name,
        image: result.secure_url // Access the uploaded file path using req.files[i]
      });

      const savedSkill = await skillData.save();

      savedSkills.push(savedSkill);
      res.status(201).json({ success: true, message: 'Skills added successfully', data: savedSkills });

    })
    // Assuming that 'image' contains the image file path


  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default addskill;
