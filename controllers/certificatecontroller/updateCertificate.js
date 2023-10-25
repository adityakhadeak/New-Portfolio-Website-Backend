import CertificateModel from "../../models/CertificateModel.js";

const updatecertificate=async(req,res)=>{

    const {title,desc,date,platform,label,doc}=req.body
    const newData={}
    if(title)newData.title=title
    if(desc)newData.desc=desc
    if(date)newData.date=date
    if(platform)newData.platform=platform
    if(label)newData.label=label
    if(doc)newData.doc=doc

    try {
        const certificate=await CertificateModel.findById(req.params.id)
        if(!certificate)
        {
            return res.status(404).json({
                success:false,
                message:"Certificate Not Found"
            })
        }

        const updatedData=await CertificateModel.findByIdAndUpdate(req.params.id,{$set:newData},{new:true})
        res.status(200).json({
            message: "Certificate Details Updated Successfully",
            success:true,
            updatedData
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: "Internal server error"
        })
    }
}

export default updatecertificate