import OTPModel from "../schema/otp.schema.js";
import { generateOTP } from "../utils/generateOTP.js";
import bcrypt from "bcryptjs";
import { sendOtp } from "../utils/otp.mail.js";
import subModel from "../schema/sub.schema.js";

export const Subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "No email" });
      }
      const check = subModel.find({ email })
      if (check) {
          return res.status(400).json({error:"Already subscribed"})
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

export const Verify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const checkValidation = await OTPModel.findOne({ email });
    if (!checkValidation) {
      return res.status(400).json({ error: "OTP expired" });
    }
      const check = await subModel.findOne({ email });
      console.log(check);   
    if (check) {
      return res.status(400).json({ error: "email is already subscribed" });
    }
    const verifyOTP = bcrypt.compare(otp, checkValidation.otp);
    if (!verifyOTP) {
      return res.status(400).json({ error: "Incorrect OTP" });
    }
    const newSub = new subModel({
      email,
    });
    await newSub.save();
    res.status(200).json({ message: "Subscribed!!!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
