import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();

export async function SendContent(context, mail, token) {
  try {
    transporter.sendMail({
      from: {
        name: "Peter Griffin",
        address: process.env.USER,
      },
      to: mail,
      subject: "Here's you today topic's",
      html: `
<p>Testing</p>
<a href="${process.env.BACK_URL}/api/sub/unsubscribe?peter=${token}" target="_blank">Unsubscribe</a>
`,
    });
  } catch (error) {
    throw error;
  }
}
