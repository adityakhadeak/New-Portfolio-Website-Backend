import ExpModel from "../../models/ExpModel.js"

const addexp = async (req, res) => {
    const experience = req.body
    const savedEdu=[]
    try {
       
        if (!experience || experience.length === 0) {
            return res.status(400).json({
                success:false,
                message: "Invalid experience details provided."
            });
        }
        const user = req.user.id; // Assuming you have access to the user's ID
        
        for (const expObj of experience) {

            const doExist= await ExpModel.findOne({duration:expObj.duration})
            if(doExist)
            {
                return res.status(409).json({
                    success:false,
                    message:"Experience Detail Already Exist For Year "+expObj.duration
                })
            }

            const newExp = new ExpModel({
                user,
                duration: expObj.duration,
                title: expObj.title,
                company: expObj.company,
                techstack: expObj.techstack,
                link: expObj.link,
                doc:expObj.doc
            })

            

            const data= await newExp.save()
            savedEdu.push(data)
        }
        res.status(201).json({
            success:true,
            data:savedEdu,
            message: "Experience Details Added Successfully",
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }

}

export default addexp