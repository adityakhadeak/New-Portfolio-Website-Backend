import ProjectModel from '../../models/ProjectModel.js';
import { v2 as cloudinary } from 'cloudinary';
const deleteproject = async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ 
        success:false,
        message: 'Project not found' 
      });
    }

    const result = await cloudinary.uploader.destroy(project.publicid);
    if (result.result==='ok') {
      await ProjectModel.findByIdAndRemove(req.params.id);
      res.status(200).json({success:true,
        message: 'Project deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default deleteproject;
