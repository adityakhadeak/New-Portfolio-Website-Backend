import ProjectModel from '../../models/ProjectModel.js';
import fs from 'fs'
const deleteproject = async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    // Delete the document from MongoDB.
    await ProjectModel.findByIdAndRemove(req.params.id);

    const imagePath = `../../client/src/images/uploads/projects/${project.image}`;

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting image file:', err);
      }
    });

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default deleteskill;
