import express from "express";
import {
  Subscribe,
  Verify,
  getContent,
  selfRequest,
  unSubscribe,
} from "../controller/sub.controller.js";

const router = express.Router();

router.post("/", Subscribe);
router.post("/verify", Verify);
router.get("/", getContent);
router.get("/self", selfRequest);
router.get("/unsubscribe", unSubscribe);

export default router;
