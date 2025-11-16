import bcrypt from "bcryptjs";
import UserModel from "../../models/UserModel.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
// import { BASE_URL } from "../../../client/src/helper.js";

export const forgotPass = async (req, res) => {
  try {
    const userData = {
      user: {
        name: "aditya",
        email: "khadeaditya1@gmail.com",
      },
    };

    const verificationtoken = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    const config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    };

    const transporter = nodemailer.createTransport(config);

    // var emailBody = mailGenerator.generate(emailToBeSent);
    const htmlContent = `
       <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #0f253a;
            color: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h2 {
            color: white;
            margin-bottom: 10px;
        }
        h1 {
            color: white;
        }
        p {
            font-size: 15px;
            margin: 10px 0;
            color: white;
        }
        .message-preview {
            font-size: 20px;
            font-weight: bold;
            margin-top: 10px;
        }
        .cta-text {
            font-size: 13px;
            font-weight: bold;
            margin-top: 8px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #0dbbde;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #09a4c7;
        }
        img {
            width: 50px;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Aditya's Portfolio</h2>
        <img src="https://res.cloudinary.com/dgdpq4lem/image/upload/v1709921895/samples/qktxwhurlf4j2qjynmdc.png" alt="Logo" />

        <h1>Hello Aditya,</h1>
        <p>You have requested to reset your password.</p>

        <p class="message-preview">To proceed, please click the button below to reset your password.</p>
        <p class="cta-text">If you did not request this, you can safely ignore this email.</p>

        <div style="text-align:center">
            <a href="https://www.adityakhadeak.engineer/reset-password?token=${verificationtoken}" class="button">Reset Password</a>
        </div>

        <p style="font-size:13px;margin-top:20px;">Best regards,<br>Your Company Team</p>
    </div>
</body>
</html>


    `;
    let message = {
      from: process.env.EMAIL,
      to: "khadeaditya1@gmail.com",
      subject: "Password Reset",
      html: htmlContent,
    };

    await transporter.sendMail(message);

    res.status(200).json({
      success: true,
      message:"Reset link sent successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

