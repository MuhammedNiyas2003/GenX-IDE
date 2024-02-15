import express from "express";
import { createFileFolder, getFileFolders } from "../controllers/fileFolder.js";

const router = express.Router();

router.get("/:workspaceId", getFileFolders);
router.post("/create", createFileFolder);

export default router;
