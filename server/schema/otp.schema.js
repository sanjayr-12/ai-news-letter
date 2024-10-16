import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true
    },
    otp: String,
    createdAt: {
        type: Date,
        default:Date.now,
        expires:300
    }
})

const OTPModel = mongoose.model("otp", OTPSchema)

export default OTPModel