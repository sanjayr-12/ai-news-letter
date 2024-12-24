import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();
import subModel from "../schema/sub.schema.js";
import { generateToken } from "../jwt/generateToken.js";

export async function custom(mail, token) {
  try {
    transporter.sendMail({
      from: {
        name: "Peter Griffin",
        address: process.env.USER,
      },
      to: mail,
      subject:
        "Alright, Alright, ALRIGHT! I'M BACK! (And I Got a New Domain, Baby!)",
      html: `
        <p>
          Hey guys, look who's back! You miss me? Huh? Huh? Okay, okay, I'm
          back! And listen to this, I even bought a new domain for 40 bucks!
          Yes, forty! You believe that? I was gonna buy some lottery tickets but
          then, a domain seemed like a more responsible choice. The name is
          <a href="https://www.omgpeter.tech">omgpeter.tech</a>, is it great
          huh? <a href="https://www.omgpeter.tech">www.omgpeter.tech</a>! So,
          get your eyeballs ready, 'cause I'll be blasting tech topics your way
          daily at... let's say 11:10 AM. Sharp! Don't be late! Alright, gotta
          go, a guy needs a beer... bye!
        </p>
      `,
    });
    console.log("email sent successfully!");
  } catch (err) {
    console.error("Failed to send  email ");
    throw err;
  }
}

export const customMail = async () => {
  try {
    const subscribers = await subModel.find();
    console.log("started sending");
    for (const subscriber of subscribers) {
      const token = generateToken(subscriber._id);
      await custom(subscriber.email, token);
      console.log("sended successfully");
    }
  } catch (error) {
    console.log(error);
  }
};
