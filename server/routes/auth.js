import express from "express";
import { userLogin, userRegister } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);

export default router;
