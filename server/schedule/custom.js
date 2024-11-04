import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();
import subModel from "../schema/sub.schema.js";

export async function custom(mail) {
  try {
    transporter.sendMail({
      from: {
        name: "Peter Griffen",
        address: process.env.USER,
      },
      to: mail,
      subject: "Hey, Just Doing My Job",
      html: `
  <p>Hey, I hope you're not doing too well... Alright, let me come straight to the point here. So, the so-called 'owner' of this job has written an article. Yeah, big whoop, right? It's a whole CRUD app thing—kinda pointless if you ask me. But don't tell him I said that, okay? I'm just doing what he told me. Ugh.</p>

  <p>Anyway, here’s the link: <a href="https://www.freecodecamp.org/news/build-crud-app-react-and-convex" target="_blank">https://www.freecodecamp.org/news/build-crud-app-react-and-convex</a></p>

  <p>Do whatever you want with it; my job's done here. Heh heh!</p>
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
      await custom(subscriber.email);
      console.log("sended successfully");
    }
  } catch (error) {
    console.log(error);
  }
};
