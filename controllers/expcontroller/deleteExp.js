import ExpModel from '../../models/ExpModel.js';
const deleteexp = async (req, res) => {
    try {
        const exp = await ExpModel.findById(req.params.id);

        if (!exp) {
            return res.status(404).json({
                success: false,
                message: 'Experience not found'
            });
        }

        await ExpModel.findByIdAndRemove(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Experience deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).json({ 
            success:false,
            error: 'Internal server error' });
    }
};

export default deleteexp;
