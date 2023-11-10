import bcrypt from 'bcryptjs'
import UserModel from '../../models/UserModel.js'

const updatepass=async(req,res)=>{
    const {oldpass,newpass}=req.body
    try {
      const userId = req.user.id
      const user = await UserModel.findById(userId)
      //Checking if the user Exists or not
      if (!user) {
        return res.status(404).json({
          success:false,
          message:"User Not Found"
        })
      }
      //Checking if the password provided is correct or not
      const isCorrect=await bcrypt.compare(oldpass,user.password)
      if(!isCorrect)
      {
        return res.status(400).json({
          success:false,
          message:"Wrong Password"
        })
      }

      //Creating new Hash and Password
      const salt=await bcrypt.genSalt(10)
      const encryptPass=await bcrypt.hash(newpass,salt)

      await UserModel.findByIdAndUpdate(userId,{password:encryptPass})

      res.status(200).json({
        success:true,
        message:"Password Updated Successfully"
      })
    } catch (error) {
      console.log(error.message)
      res.status(400).json({
        message: "Internal server error"
      })
    }
}
export default updatepass