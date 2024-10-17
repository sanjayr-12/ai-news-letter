import { configDotenv } from "dotenv";
configDotenv();

export function verify(req, res, next) {
  if (process.env.AUTH1 === process.env.AUTH2) {
    next();
  } else {
    return res.status(401).json({ error: "Not authorized" });
  }
}
