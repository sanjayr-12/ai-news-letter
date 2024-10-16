import express from "express"
import { Subscribe, Verify } from "../controller/sub.controller.js"
const router = express.Router()


router.post("/", Subscribe)
router.post("/verify", Verify)

export default router