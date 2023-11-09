import ContactModel from "../../models/ContactModel.js";

const deleteMsg = async (req, res) => {

    try {
        const msg = await ContactModel.findById(req.params.id)
        if (!msg) {
            return res.status(404).send('Not Found')
        }
        const deletedMsg = await ContactModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            message:"Message Deleted Successfully"
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            success:false,
            message: "Internal server error"
        })
    }
}
export default deleteMsg