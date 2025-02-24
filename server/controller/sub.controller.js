import OTPModel from "../schema/otp.schema.js";
import { generateOTP } from "../utils/generateOTP.js";
import bcrypt from "bcryptjs";
import { sendOtp } from "../utils/otp.mail.js";
import subModel from "../schema/sub.schema.js";
import { genContent } from "../gemini/gemini.js";
import { ThankMess } from "../utils/thank.mail.js";
import jwt from "jsonwebtoken";
import { GoodByeMess } from "../utils/goodBye.js";
import singleModel from "../schema/single.schema.js";
import { singleToken } from "../jwt/singleToken.js";
import { sendSingleMail } from "../utils/singleMail.js";
import blackModel from "../schema/blackList.schema.js";

export const Subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "No email" });
    }

    const check = await subModel.findOne({ email });
    if (check) {
      return res.status(400).json({ error: "Already subscribed" });
    }

    const otp = generateOTP().toString();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(otp, salt);
    const otpEmailCheck = await OTPModel.findOne({ email });
    if (otpEmailCheck) {
      await OTPModel.findByIdAndUpdate(otpEmailCheck._id, { otp: hash });
      await sendOtp(otp, email);
      return res.status(200).json({ message: "New otp sent" });
    }
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
    const verifyOTP = await bcrypt.compare(otp, checkValidation.otp);
    console.log(verifyOTP);

    if (!verifyOTP) {
      return res.status(400).json({ error: "Incorrect OTP" });
    }
    const newSub = new subModel({
      email,
    });
    await newSub.save();
    await ThankMess(email);
    res.status(200).json({ message: "Subscribed!!!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const selfRequest = (req, res) => {
  return res.status(200).json({ message: "server restarted" });
};

export const unSubscribe = async (req, res) => {
  try {
    const token = req.query.peter;
    if (!token) {
      return res.status(400).render("unsubscribe", {
        title: "Whoa, something went wrong. What’d you do?",
      });
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
      return res.status(400).render("unsubscribe", {
        title:
          "Oh man, something’s off, and I have no idea what it is. Heh heh!",
      });
    }
    const response = await subModel.findByIdAndDelete(verify.id);
    if (!response) {
      return res.status(400).render("unsubscribe", {
        title: "Uh... you’re already unsubscribed, pal.",
      });
    }

    await GoodByeMess(response.email);
    return res.status(200).render("unsubscribe", {
      title: "Alright, good bye! Don’t forget me. Heh heh.",
    });
  } catch (error) {
    return res.status(500).render("unsubscribe", {
      title: "Internal server error link expired",
    });
  }
};

export const singleSub = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const checkAlreadySub = await subModel.findOne({ email });
    if (checkAlreadySub) {
      return res.status(400).json({ error: "Already Subscribed" });
    }
    const checkSingleSub = await singleModel.findOne({ email });
    if (checkSingleSub) {
      const token = singleToken(newSingle._id);
      sendSingleMail(token, email);
      return res.status(200).json({ message: "Check your mail" });
    }
    const newSingle = new singleModel({
      email,
    });
    await newSingle.save();
    const token = singleToken(newSingle._id);
    sendSingleMail(token, email);
    return res.status(200).json({ message: "Check your mail" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error " + error.message });
  }
};

export const verifySingle = async (req, res) => {
  try {
    const token = req.query.sub;

    if (!token) {
      return res.status(400).json({ error: "No token" });
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
      return res.status(400).json({ error: "Verificaton fails" });
    }
    const checkSingle = await singleModel.findById(verify.id);

    if (!checkSingle) {
      return res.status(400).json({ error: "Email is not present" });
    }
    const blackList = await blackModel.findOne({ token });
    if (blackList) {
      return res.status(400).json({ error: "Link Expired" });
    }
    const newBlack = new blackModel({
      token,
    });
    await newBlack.save();
    const newEmail = await subModel({
      email: checkSingle.email,
    });
    await newEmail.save();
    ThankMess(newEmail.email);
    return res.status(200).send("subscribed successfully");
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error " + error.message });
  }
};
