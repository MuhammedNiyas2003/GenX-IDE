import express from "express";
import { codeConverter } from "../controllers/openai.js";

const router = express.Router();

router.post("/covert-code", codeConverter);

export default router;
