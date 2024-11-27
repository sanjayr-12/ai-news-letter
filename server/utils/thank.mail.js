import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();

export async function ThankMess(mail) {
  try {
    transporter.sendMail({
      from: {
        name: "Peter Griffen",
        address: process.env.USER,
      },
      to: mail,
      subject: "Thanks for Subscribing, Pal!",
      text: `Hey, thanks for subscribing or whatever. So here’s the deal—every day at 11:10 AM, you’re gonna get two random tech topics. Yeah, sounds like a lot of work for you, but don’t worry, you don’t have to do much except read them. 11:10 AM, every day. Maybe grab some coffee. Heh heh, good luck with that!`,
      html: `<p>Hey, thanks for subscribing or whatever. Here’s the deal—<b>every day at 11:10 AM</b>, you’re gonna get <b>two random tech topics</b>. Sounds like a lot, right? But don’t worry, all you gotta do is read ‘em. 11:10 AM sharp, every day. Maybe grab a coffee or something... Heh heh, good luck with that!</p>`,
    });
    console.log("Thank you email sent successfully!");
  } catch (err) {
    console.error("Failed to send thank you email ");
    throw err;
  }
}
