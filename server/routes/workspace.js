import express from "express";
import {
  createWorkspace,
  getRecentWorkspaces,
  getWorkspace,
} from "../controllers/workspace.js";

const router = express.Router();

router.post("/create-workspace", createWorkspace);
router.get("/recent/:userId", getRecentWorkspaces);
router.get("/:workspaceId", getWorkspace);

export default router;
