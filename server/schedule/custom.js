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
      subject: "You Can Unsubscribe, But You’ll Miss Me!",
      html: `
<p>Hey guys, big news... I’ve added an unsubscribe feature! Now, you can unsubscribe if you really want to, but think about it—once you're gone, you'll miss me. Seriously, who doesn't want to hear from Peter every day? Heh heh, I know you’ll regret it!</p>

<p>If you still want to go, fine. But just remember, I’ll always be here, waiting for you. And hey, every daily topic email will have the unsubscribe link, and it'll be valid for 24 hours.</p>

<a href="${process.env.BACK_URL}/api/sub/unsubscribe?peter=${token}" target="_blank">Unsubscribe</a>
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
      if (subscriber.email === "sanjayr.cs22@bitsathy.ac.in") {
        const token = generateToken(subscriber.email);
        await custom(subscriber.email, token);
        console.log("sended successfully");
      }
    }
  } catch (error) {
    console.log(error);
  }
};
