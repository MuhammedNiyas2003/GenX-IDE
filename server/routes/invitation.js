import express from "express";
import {
  getNotification,
  sendInvitation,
  approveInvitation,
  deleteNotification,
} from "../controllers/invitation.js";

const router = express.Router();

router.post("/send", sendInvitation);
router.get("/:userId", getNotification);
router.post("/approve/:userId", approveInvitation);
router.delete("/:notificationId", deleteNotification);

export default router;
