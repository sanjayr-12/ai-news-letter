import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();

export async function GoodByeMess(mail) {
  try {
    transporter.sendMail({
      from: {
        name: "Peter Griffin",
        address: process.env.USER,
      },
      to: mail,
      subject: "Sad to See You Go!",
      text: `Oh man, you unsubscribed? That’s kinda sad... I thought we had something special! But hey, no hard feelings. If you ever feel like coming back and getting two random tech topics every day at 11:10 AM, you can resubscribe here: https://www.peter.work.gd. Anyway, take care... I’ll miss ya. Heh heh.`,
      html: `<p>Oh man, you unsubscribed? That’s kinda sad... I thought we had something special! But hey, no hard feelings.</p>
             <p>If you ever feel like coming back and getting <b>two random tech topics</b> every day at <b>11:10 AM</b>, you can resubscribe here: <a href="https://www.peter.work.gd" target="_blank">https://www.peter.work.gd</a>.</p>
             <p>Anyway, take care... I’ll miss ya. Heh heh.</p>`,
    });
  } catch (err) {
    throw err;
  }
}
