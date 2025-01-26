import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();
export const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
})
