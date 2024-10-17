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
      text: `Giggity! Here’s your OTP, champ! You’ve got 5 minutes to use it before it’s gone, gone, gone! So don’t wait, enter this baby right now: ${otp}! Awright!`,
      html: `<p>Giggity! Here’s your OTP, champ! You’ve got <b>5 minutes</b> to use it before it’s gone, gone, gone! So don’t wait, enter this baby right now: <h1>${otp}</h1> Awright!</p>
`,
    });
    console.log("OTP email sent successfully!");
  } catch (err) {
    console.error("Failed to send OTP email ");
    throw err;
  }
}
