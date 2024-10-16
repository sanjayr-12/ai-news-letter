import express from "express"
import { Subscribe } from "../controller/sub.controller.js"
const router = express.Router()


router.post("/",Subscribe)

export default router