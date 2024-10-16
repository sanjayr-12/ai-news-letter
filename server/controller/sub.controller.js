import OTPModel from "../schema/otp.schema.js";
import { generateOTP } from "../utils/generateOTP.js";
import bcrypt from "bcryptjs";
import { sendOtp } from "../utils/otp.mail.js";

export const Subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "No email" });
      }
    const otp = generateOTP().toString();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(otp, salt);
    const newData = new OTPModel({
      email,
      otp: hash,
    });
    await sendOtp(otp, email);
    await newData.save();
    res.status(200).json({ message: "check your mail for otp" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
