import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();
import subModel from "../schema/sub.schema.js";

export async function custom(mail) {
  try {
    transporter.sendMail({
      from: {
        name: "Quagmire",
        address: process.env.USER,
      },
      to: mail,
      subject: "Good bye",
      html:
        "<p>Hey, hey, hey! Giggity! What’s up, guys? You know me—<b>Quagmire</b>, baby! Yeah, I’m a pilot... or at least I <b>was</b>! Got suspended for... well, you know, reasons... <i>giggity!</i> So I had to take this crappy gig in the meantime. But guess what? I’m getting my <b>license back</b>! Awright!</p>" +
        "<p>And now, my buddy <b>Peter</b>’s gonna take over this whole mess. So, you know, blame him if things go sideways, <i>giggity goo!</i> Awright!</p>",
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
