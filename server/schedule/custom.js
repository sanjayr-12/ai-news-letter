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
      subject: "New Look, Same Website, But Now It's Mine!",
      html: `
<p>Hey guys, big update! I’ve officially taken over this website—yep, it's mine now! I got sick of the old UI, so I gave it a makeover. Check out the brand-new look! Oh, and I didn’t stop there—I also bought a shiny new domain. You can now find my site at <a href="https://www.peter.work.gd" target="_blank">www.peter.work.gd</a>. Looks way cooler, right? Heh heh!</p>

<p>So go ahead, take a look at the new UI. Or don't... whatever. But hey, it's my site now, and it’s got a slick new vibe. My work here is done. Heh heh, sweet!</p>
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
