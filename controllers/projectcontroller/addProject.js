import ProjectModel from "../../models/ProjectModel.js";
import { v2 as cloudinary } from 'cloudinary';

const addproject = async (req, res) => {
  try {
    const project = req.body;
    const uploadedFile = req.files.image
    const base64DataUrl = `data:${uploadedFile.mimetype};base64,${uploadedFile.data.toString('base64')}`;
    const savedProjects = []
    await cloudinary.uploader.upload(base64DataUrl, async (err, result) => {
      const ProjectData = new ProjectModel({
        title: project.title,
        desc: project.desc,
        tools: project.tools,
        links: {
          github: project.github,
          live: project.live
        },
        publicid:result.public_id,
        image: result.secure_url // Access the uploaded file path using req.files[i]
      });

      const savedProject = await ProjectData.save();
      savedProjects.push(savedProject)

      res.status(201).json({
        success: true,
        message: 'Project added successfully',
        data: savedProjects
      });

    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export default addproject;
