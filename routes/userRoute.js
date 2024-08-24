import express from 'express'
import { body } from 'express-validator'
import UserModel from '../models/UserModel.js'
import createuser from '../controllers/usercontroller/userCreateControll.js'
import logincontroll from '../controllers/usercontroller/loginController.js'
import fetchuser from '../middleware/fetchUser.js'
import updatepass from '../controllers/usercontroller/updatePass.js'
import adduserdetails from '../controllers/usercontroller/addUserDetails.js'
import UserDetailsModel from '../models/UserDetailsModel.js'
import deleteuserdetails from '../controllers/usercontroller/deleteUserDetails.js'
import updateuserdetails from '../controllers/usercontroller/updateUserDetails.js'
const routeUser = express()


//Creating a user using a Post request
routeUser.post('/createuser', [
  body('name', "Name should be of atleast of 2 chars").isLength({ min: 2 }),
  body('email', "Please check your Email").isEmail(),
  body('username', "Username should be atleast of 6 chars").isLength({ min: 6 }),
  body('password', "Password should be of atleast 5 char").isLength({ min: 5 })
], createuser)


//Creating a endpoint for login
routeUser.post('/login', logincontroll)

//Getting the info of loggedin user 
routeUser.get('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id
    const user = await UserModel.findById(userId).select('-password')
    res.status(200).json({
      success:true,
      data:user
    })
  } catch (error) {
    console.log(error.message)
    res.status(400).json({
      success:false,
      message: "Internal server error"
    })
  }
})
routeUser.post('/adduserdetails',fetchuser,adduserdetails)
routeUser.delete('/deleteuserdetails/:id',fetchuser,deleteuserdetails)
routeUser.get('/fetchuserdetails',async(req,res)=>{
  try {
    const userDetails = await UserDetailsModel.find({})
    res.status(200).json({
      success:true,
      data:userDetails
    })
  } catch (error) {
    res.status(400).json({
      success:false,
      message: "Internal server error"
    })
  }
})
//route for updating the password
routeUser.put('/updateuserdetails/:id', fetchuser, updateuserdetails)

routeUser.put('/updatepass',fetchuser,updatepass)
export default routeUser