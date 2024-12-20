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
      subject: "Hang Tight, Folks—Upgrades and Fixes in Progress!",
html: `
<p>Hey guys, just a quick heads-up. There’s some stuff going on with the site—yeah, a few upgrades and, uh, a domain problem (don’t ask). So, I won’t be sending any topics for the next few days. Bummer, right? But don’t worry, I’m on it! Heh heh!</p>

<p>Once I fix everything, I’ll be back with more tech topics in classic Peter Griffin style. Just hang tight and keep an eye on your inbox. Thanks for sticking around, pals!</p>
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
