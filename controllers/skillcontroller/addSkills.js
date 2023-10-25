import SkillModel from "../../models/SkillModel.js";

const addskill = async (req, res) => {
  try {
    const skills = req.body;
    const files=req.file.filename
    console.log(files)
    const savedSkills = [];

    

      // Assuming that 'image' contains the image file path
      const skillData = new SkillModel({
        name:skills.name,
        image: req.file.filename // Access the uploaded file path using req.files[i]
      });

      const savedSkill = await skillData.save();

      savedSkills.push(savedSkill);
    

    res.status(201).json({success:true, message: 'Skills added successfully', data: savedSkills });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default addskill;
