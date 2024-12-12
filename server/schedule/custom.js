import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();
import subModel from "../schema/sub.schema.js";

export async function custom(mail) {
  try {
    transporter.sendMail({
      from: {
        name: "Peter Griffin",
        address: process.env.USER,
      },
      to: mail,
      subject: "Same Website, Fancy New Name",
      html: `
  <p>Hey guys, big news! Well, not *that* big, but whatever. I didn’t make a brand-new website or anything, but I *did* update the name! You can now find my site at <a href="http://www.petergriffin.work.gd" target="_blank">www.petergriffin.work.gd</a>. Sounds fancy, right? Yeah, I thought so too. Heh heh!</p>

  <p>So, go check it out... or don’t. It’s the same old site with a shiny new name. My job here’s done. Heh heh, sweet!</p>
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
