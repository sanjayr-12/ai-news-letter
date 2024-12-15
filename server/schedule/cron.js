import { genContent } from "../gemini/gemini.js";
import cron from "node-cron";
import subModel from "../schema/sub.schema.js";
import { SendContent } from "../utils/context.js";
import { generateToken } from "../jwt/generateToken.js";

export const Schedule = () => {
  cron.schedule(
    "10 11 * * *",
    async () => {
      try {
        const context = await genContent();
        const subscribers = await subModel.find();
        console.log("started sending");
        for (const subscriber of subscribers) {
          const token = generateToken(subscriber._id);
          await SendContent(context, subscriber.email, token);
          console.log("sended successfully");
        }
      } catch (error) {
        console.log(error);
      }
    },
    {
      timezone: "Asia/Kolkata",
    }
  );
};
