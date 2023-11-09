import EduModel from '../../models/EduModel.js';
const deleteedu = async (req, res) => {
    try {
        const edu = await EduModel.findById(req.params.id);

        if (!edu) {
            return res.status(404).json({
                success: false,
                message: 'Education not found'
            });
        }

        await EduModel.findByIdAndRemove(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Education deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default deleteedu;
