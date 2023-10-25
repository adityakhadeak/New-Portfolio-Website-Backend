import CertificateModel from "../../models/CertificateModel.js";

const addcertificate = async (req, res) => {

    const certificates = req.body
    console.log(certificates)
    const dataSaved=[]
    try {
        if (!certificates || certificates.length == 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid Certificate details provided."
            });
        }

        const user = req.user.id; // Assuming you have access to the user's ID
        for (const cerObj of certificates) {
            const newCer = new CertificateModel({
                user,
                title: cerObj.title,
                desc: cerObj.desc,
                date: cerObj.date,
                platform: cerObj.platform,
                label: cerObj.label,
                doc: cerObj.doc
            })

            const savedData = await newCer.save()
            console.log(savedData)
            dataSaved.push(savedData)
        }
        res.status(200).json({
            success: true,
            message: "Certificate Added Successfully",
            data:dataSaved
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export default addcertificate