import fetchuser from '../middleware/fetchUser.js'
import express from 'express'
import CertificateModel from '../models/CertificateModel.js'
import updatecertificate from '../controllers/certificatecontroller/updateCertificate.js'
import addcertificate from '../controllers/certificatecontroller/addCertificate.js'


const routerCer = express()

//Add Certificate Details
routerCer.post('/addcertificate', fetchuser, addcertificate)

//Fetch Certificate Details
routerCer.get('/fetchcertificates', fetchuser, async (req, res) => {
    try {
        const cerData = await CertificateModel.find({})
        if (!cerData) {
            return res.status(404).json({
                success:false,
                message: "Certificate Data Not Found"
            })
        }
        res.status(200).json({
            success: true,
            data: cerData
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Internal server error"
        })

    }
})
//Update Certificate Details
routerCer.put('/updatecertificate/:id', fetchuser, updatecertificate)


routerCer.delete("/deletecer/:id", fetchuser, async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const cer = await CertificateModel.findById(id);
        if (!cer) {
            res.status(404).json({
                success: false,
                message: "Certificate does not found"
            })
        }
        const toBeDeleted = await CertificateModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Certificate deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Internal server error"
        })
    }
});


export default routerCer
