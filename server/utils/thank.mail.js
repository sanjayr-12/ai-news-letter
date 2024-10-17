import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();

export async function ThankMess(mail) {
  try {
    transporter.sendMail({
      from: {
        name: "Quagmire",
        address: process.env.USER,
      },
      to: mail,
      subject: "Thanks for Subscribing!",
      text: `Giggity! Thanks for subscribing, tech champ! You’re in for a treat—every day, you’ll get two random tech topics, straight to your inbox! Get ready for some daily knowledge action, baby! Awright!`,
      html: `<p>Giggity! Thanks for subscribing, tech champ! You’re in for a treat—<b>every day</b>, you’ll get <b>two random tech topics</b>, straight to your inbox! Get ready for some daily knowledge action, baby! Awright!</p>`,
    });
    console.log("Thank you email sent successfully!");
  } catch (err) {
    console.error("Failed to send thank you email ");
    throw err;
  }
}
