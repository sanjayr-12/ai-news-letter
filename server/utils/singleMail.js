import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();

export async function sendSingleMail(token, mail) {
  try {
    transporter.sendMail({
      from: {
        name: "Peter Griffin",
        address: process.env.USER,
      },
      to: mail,
      subject: "Subscribe link",
      html: `<p>Hey there! Here's your one-time use Single Subscribe, and it will expire after 5 minutes. Use it wisely!</p><a href="${process.env.BACK_URL}/api/sub/single?sub=${token}" target="_blank">Subscribe Link</a>`,
    });
  } catch (error) {
    throw error;
  }
}
