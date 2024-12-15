import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();

export async function SendContent(context, mail) {
 
    try {
      transporter.sendMail({
        from: {
          name: "Peter Griffin",
          address: process.env.USER,
        },
        to: "peterguy1996@gmail.com",
        subject: "Here's you today topic's",
        html: "testing",
      });
    } catch (error) {
      throw error;
    }
}
