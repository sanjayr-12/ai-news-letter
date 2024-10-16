import express from "express"
import { configDotenv } from "dotenv";
import connectDB from "./db/db.js";
configDotenv()
import subRoutes from "./routes/sub.routes.js"

const app = express()
app.use(express.json())


app.use("/api/sub", subRoutes)


app.listen((process.env.PORT), () => {
    console.log("server started at " + process.env.PORT);
    connectDB()
})