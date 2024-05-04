import express from "express";
import { createPost, getAllPost } from "../controllers/explore.js";

const router = express.Router();

router.get("/", getAllPost);
router.post("/create", createPost);

export default router;
