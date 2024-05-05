import express from "express";
import {
  createFileFolder,
  getFileFolders,
  deleteFileFolder,
} from "../controllers/fileFolder.js";

const router = express.Router();

router.get("/:workspaceId", getFileFolders);
router.post("/create", createFileFolder);
router.delete("/:fileFolderId", deleteFileFolder);

export default router;
