import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();

export async function sendOtp(otp, mail) {
  try {
    transporter.sendMail({
      from: {
        name: "Quagmire",
        address: process.env.USER,
      },
      to: mail,
      subject: "Yours OTP",
      text: `Here's your OTP, valid for 5 minutes: ${otp}`,
      html: `<p>Here's your OTP, valid for 5 minutes: <b>${otp}</b></p>`,
    });
    console.log("OTP email sent successfully!");
  } catch (err) {
    console.error("Failed to send OTP email ");
    throw err;
  }
}
