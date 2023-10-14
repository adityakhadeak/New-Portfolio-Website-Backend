import ExpModel from "../../models/ExpModel.js"

const addexp = async (req, res) => {
    const experience = req.body

    try {
       
        if (!experience || experience.length === 0) {
            return res.status(400).json({
                message: "Invalid experience details provided."
            });
        }
        const user = req.user.id; // Assuming you have access to the user's ID
        
        for (const expObj of experience) {

            const doExist= await ExpModel.findOne({duration:expObj.duration})
            if(doExist)
            {
                return res.status(409).json({
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

            

            const savedEdu = await newExp.save()

            console.log(savedEdu)
        }
        res.status(201).json({
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