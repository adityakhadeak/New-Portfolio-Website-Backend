import ContactModel from "../../models/ContactModel.js";
import { validationResult } from 'express-validator'
import nodemailer from 'nodemailer'
const addMsg = async (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name, email, msg } = req.body

    try {
        const newmsg = new ContactModel({
            name, email, msg
        })
        const sendMsg = await newmsg.save()

        const config = {
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        }

        const transporter = nodemailer.createTransport(config);


        // var emailBody = mailGenerator.generate(emailToBeSent);
        const htmlContent = `
        <div style="background-color:#0f253a;background-size:300% 100%;border-radius:10px;color:white;padding:20px;flex-direction:column;">
        <div style="text-align:center;margin-bottom:3px;">
        <h2 style="color:white;">Aditya's Portfolio</h2>
        <img width='50px' src="https://res.cloudinary.com/dgdpq4lem/image/upload/v1709921895/samples/qktxwhurlf4j2qjynmdc.png"/>
        </div>
        <h1 style="color:white">Hello Aditya,</h1>
        
        <p style="font-size:15px;margin: 0;color:white">You have a new message from: ${name}, mailid: ${email}</p>
        
        <p style="font-size:20px;font-weight:bold;color:white">Message: ${msg.substring(0,20)}......</p>
        <p style="font-size:13px;font-weight:bold;color:white;margin-top:8px;">To view full message click on the button below</p>
    <div style="text-align:center">
    
    <a href="https://www.adityakhadeak.me" style="color:white; text-decoration:none; background-color:#0dbbde; padding:10px 20px; border-radius:5px; display:inline-block;">Go to Site</a>
    </div>

    </div>


    `;
        let message = {
            from: process.env.EMAIL,
            to: 'khadeaditya1@gmail.com',
            subject: "Message",
            html: htmlContent
        }

        await transporter.sendMail(message)

        res.status(200).json({
            success: true,
            msg: sendMsg
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            success: false,
            message: "Internal server error",
        })
    }
}

export default addMsg