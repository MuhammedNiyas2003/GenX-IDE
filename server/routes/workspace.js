import express from "express";
import {
  createWorkspace,
  getRecentWorkspaces,
  getWorkspace,
  updateWorkspaceDetails,
} from "../controllers/workspace.js";

const router = express.Router();

router.get("/recent/:userId", getRecentWorkspaces);
router.get("/:workspaceId", getWorkspace);
router.post("/create-workspace", createWorkspace);
router.put("/:workspaceId", updateWorkspaceDetails);

export default router;
