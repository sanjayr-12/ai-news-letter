import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();

export async function sendOtp(otp, mail) {
  try {
    transporter.sendMail({
      from: {
        name: "Peter Griffin",
        address: process.env.USER,
      },
      to: mail,
      subject: "Your OTP, Buddy!",
      text: `Hey, it's Peter Griffin! You got an OTP... you’ve only got like 5 minutes before it disappears or something. So hurry up and use this thing: ${otp}. Yeah, you probably should do that now... oh crap, I forgot what I was saying! Heh heh, good luck, champ!`,
      html: `<p>Hey, it's Peter Griffin! You got an OTP... you’ve only got <b>5 minutes</b> before it’s gone! So you should probably enter this right now: <h1>${otp}</h1>. Yeah... good luck with that! Oh man, I forgot what I was saying... heh heh heh!</p>`,
    });
    console.log("OTP email sent successfully!");
  } catch (err) {
    console.error("Failed to send OTP email ");
    throw err;
  }
}
