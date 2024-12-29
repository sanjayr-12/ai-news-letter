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
      subject: "Taking a Break, But the Show Goes On!",
      html: `
  <p>
    Hey guys, life's been throwing curveballs at me—both in real life and in the backend. So, I’ve decided to take a long break. Don’t worry, though, the service will still be up and running, but I won’t be sending out any new topics for a while. 
  </p>
  <p>
    Consider this your tech topic vacation! Alright, gotta go sort some stuff out. Catch you all later... bye for now!
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
