import express from "express";
import { Subscribe, Verify, getContent } from "../controller/sub.controller.js";
import { verify } from "../middleware/verify.js";
// import { genContent } from "../gemini/gemini.js"
const router = express.Router();

router.post("/", verify, Subscribe);
router.post("/verify", verify, Verify);
router.get("/", verify, getContent);

export default router;
