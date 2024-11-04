import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
dotenv.config();
import subRoutes from "./routes/sub.routes.js";
import cors from "cors";
import { Schedule } from "./schedule/cron.js";
import { reStart } from "./schedule/selfCron.js";
import { customMail } from "./schedule/custom.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/sub", subRoutes);

app.listen(process.env.PORT, () => {
  console.log("server started at " + process.env.PORT);
  connectDB();
  reStart();
  Schedule();
  // customMail()
});
