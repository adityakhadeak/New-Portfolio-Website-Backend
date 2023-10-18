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
                message: "Certificate Data Not Found"
            })
        }
        res.send(cerData)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Internal server error"
        })

    }
})
//Update Certificate Details
routerCer.put('/updatecertificate/:id', fetchuser, updatecertificate)


export default routerCer
