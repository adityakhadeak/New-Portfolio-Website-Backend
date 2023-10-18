import CertificateModel from "../../models/CertificateModel.js";

const addcertificate=async(req,res)=>{

    const certificates=req.body

    try {
        if (!certificates||certificates.length==0) {
            return res.status(400).json({
                message: "Invalid Certificate details provided."
            });        }

            const user = req.user.id; // Assuming you have access to the user's ID
            for(const cerObj of certificates)
            {
                const newCer = new CertificateModel({
                    user,
                    title:cerObj.title,
                    desc:cerObj.desc,
                    date:cerObj.date,
                    platform:cerObj.platform,
                    label:cerObj.label,
                    doc:cerObj.doc
                })

                const savedData=await newCer.save()
                console.log(savedData)
            }
            res.status(200).json({
                message:"Certificate Added Successfully"
            })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export default addcertificate