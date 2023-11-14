import UserDetailsModel from '../../models/UserDetailsModel.js';
import { v2 as cloudinary } from 'cloudinary';
const deleteuserdetails = async (req, res) => {
  try {
    const details = await UserDetailsModel.findById(req.params.id);

    if (!details) {
      return res.status(404).json({ 
        success:false,
        message: 'Details not found' 
      });
    }

    const result = await cloudinary.uploader.destroy(details.publicid);
    if (result.result==='ok') {
      await UserDetailsModel.findByIdAndRemove(req.params.id);
      res.status(200).json({success:true,
        message: 'Details deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting details:', error);
    res.status(500).json({success:false, message: 'Internal server error' });
  }
};

export default deleteuserdetails;
