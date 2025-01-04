import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();

export async function ThankMess(mail) {
  try {
    transporter.sendMail({
      from: {
        name: "Peter Griffin",
        address: process.env.USER,
      },
      to: mail,
      subject: "Thanks for Subscribing, Pal!",
      text: `Hey, thanks for subscribing or whatever. But here’s the thing—I’m kinda broke right now, so no tech topics for a while. Yeah, bummer, huh? I’m taking a break. Don’t worry though, I’ll let you know when I’m back in action! Heh heh, stay tuned!`,
      html: `<p>Hey, thanks for subscribing or whatever. But here’s the thing—<b>I’m kinda broke right now</b>, so no tech topics for a while. Yeah, bummer, huh? <b>I’m taking a break</b>. Don’t worry though, I’ll let you know when I’m back in action! Heh heh, stay tuned!</p>`,
    });
    console.log("Thank you email sent successfully!");
  } catch (err) {
    console.error("Failed to send thank you email ");
    throw err;
  }
}
