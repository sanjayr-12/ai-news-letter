import express from "express"
import { Subscribe, Verify, getContent } from "../controller/sub.controller.js"
// import { genContent } from "../gemini/gemini.js"
const router = express.Router()


router.post("/", Subscribe)
router.post("/verify", Verify)
router.get("/",getContent)

export default router