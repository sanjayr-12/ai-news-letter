import cron from "node-cron";
import { configDotenv } from "dotenv";
configDotenv();
import axios from "axios";

const backend = process.env.SELF_API;

export const reStart = () => {
  cron.schedule(
    "*/14 * * * *",
    async () => {
      const response = await axios.get(backend);
      console.log(response.data.message);
    },
    {
      timezone: "Asia/Kolkata",
    }
  );
};
