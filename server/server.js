import express from "express"
import dotenv from "dotenv";
import connectDB from "./db/db.js";
dotenv.config()
import subRoutes from "./routes/sub.routes.js"

const app = express()
app.use(express.json())


app.use("/api/sub", subRoutes)


app.listen((process.env.PORT), () => {
    console.log("server started at " + process.env.PORT);
    connectDB()
})