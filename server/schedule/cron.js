import { genContent } from "../gemini/gemini.js";
import cron from "node-cron";
import subModel from "../schema/sub.schema.js";
import { SendContent } from "../utils/context.js";

export const Schedule = () => {
  cron.schedule(
    "0 6 * * *",
    async () => {
      try {
        const context = await genContent();
        const subscribers = await subModel.find();
        console.log("started sending");
        for (const subscriber of subscribers) {
          await SendContent(context, subscriber.email);
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
