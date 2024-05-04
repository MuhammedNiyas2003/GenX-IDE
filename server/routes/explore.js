import express from "express";
import {
  createPost,
  getAllPost,
  getUserPosts,
} from "../controllers/explore.js";

const router = express.Router();

router.get("/", getAllPost);
router.post("/create", createPost);
router.get("/:userId", getUserPosts);

export default router;
