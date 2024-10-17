import express from "express";
import { Subscribe, Verify, getContent, selfRequest } from "../controller/sub.controller.js";

const router = express.Router();

router.post("/", Subscribe);
router.post("/verify", Verify);
router.get("/", getContent);
router.get("/self", selfRequest)

export default router;
