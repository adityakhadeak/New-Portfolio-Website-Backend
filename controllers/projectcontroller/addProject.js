import ProjectModel from "../../models/ProjectModel.js";

const addproject= async (req, res) => {
  try {
    const project = req.body;
console.log(project)
      // Assuming that 'image' contains the image file path
      const projectData = new ProjectModel({
        title:project.title,
        desc:project.desc,
        tool:project.tools,
        links:{
            github:project.github,
            live:project.live
        },
        image: req.file.filename // Access the uploaded file path using req.files[i]
      });

      const savedProject = await projectData.save();

    

    res.status(201).json({ message: 'Project added successfully', data: savedProject });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default addproject;
