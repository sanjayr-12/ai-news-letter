import OTPModel from "../schema/otp.schema.js";
import { generateOTP } from "../utils/generateOTP.js";
import bcrypt from "bcryptjs"

const sendOTP = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            return res.status(400).json({error:"No email"})
        }
        const otp = generateOTP()
        const salt = await bcrypt.genSalt(10)
        const hash = bcrypt.hash(otp, salt)
        const newData = new OTPModel({
            email,
            otp: hash,
            createdAt:Date.now()
        })
    } catch (error) {
        
    }
}