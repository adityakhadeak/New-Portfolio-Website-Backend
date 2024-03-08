import express from 'express'
import deleteMsg from '../controllers/contactcontroller/deleteMsg.js'
import addMsg from '../controllers/contactcontroller/addMsg.js'
import {body} from 'express-validator'
import fetchmsg from '../controllers/contactcontroller/fetchAllMsg.js'
import rateLimit from 'express-rate-limit'
import fetchuser from '../middleware/fetchUser.js'
const route=express()

const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 2, // Allow 1 request per email per day
    keyGenerator: (req) => {
      return req.body.email;
    },
        message: "Only two message for today.",
  });



//Route 1 for Fetching all messages using get request /api/contact/fetchallmsg Login required
route.get('/fetchallmsg', fetchuser,fetchmsg)

//Route 2 for sending messages using post /api/contact/addmsg request 


route.post('/addmsg',
[body('name', "Name should be of atleast of 2 chars").isLength({ min: 2 }),
body('msg', "Message should be of atleast 5 char").isLength({ min: 5 })],limiter, addMsg)

//Route 3 for deleting messages using post request  /api/contact/deletemsg
route.delete('/deletemsg/:id',fetchuser, deleteMsg)

export default route