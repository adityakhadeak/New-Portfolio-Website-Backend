import EduModel from "../../models/EduModel.js"

const addedu = async (req, res) => {
    const educations = req.body
    const savedEdu=[]
    try {
       
        if (!educations || educations.length === 0) {
            return res.status(400).json({
                success:false,
                message: "Invalid education details provided."
            });
        }
        const user = req.user.id; // Assuming you have access to the user's ID
        
        for (const eduObj of educations) {

            const doExist= await EduModel.findOne({year:eduObj.year})
            if(doExist)
            {
                return res.status(409).json({
                    success:false,
                    message:"Education Detail Already Exist For Year "+eduObj.year
                })
            }

            const newEdu = new EduModel({
                user,
                year: eduObj.year,
                clg: eduObj.clg,
                edu: eduObj.edu,
                sts: eduObj.sts,
                link: eduObj.link,
            })

            

            const data = await newEdu.save()
            savedEdu.push(data)
            console.log(savedEdu)
        }
        res.status(201).json({
            success:true,
            data:savedEdu,
            message: "Education Details Added Successfully",
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }

}

export default addedu