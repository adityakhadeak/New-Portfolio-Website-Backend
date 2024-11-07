import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import UserModel from "../../models/UserModel.js";
export const resetPassword = async (req, res) => {
    const { token } = req.query;
    const { email, password } = req.body
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(password)
        if (!decoded.user) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        console.log(decoded)
        if (decoded.user.email != email) {
            return res.status(400).json({
                success: false,
                message: "Invalid request"
            })
        }

        const userId = decoded.user.id;
        const salt= await bcrypt.genSalt(10)

        const encryptedPass = await bcrypt.hash(password.newPassword, salt)

        const result = await UserModel.updateOne(
            { email: email },
            { $set: { password: encryptedPass } }
        )
        res.status(200).json({
            success: true,
            message: "Password reset successfull"
        })

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Link expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid link' });
        }
        console.log(err);
        res.status(500).json({ success: false, message: 'Error resetting password' });
    }

}