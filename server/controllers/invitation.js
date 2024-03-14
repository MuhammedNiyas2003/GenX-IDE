import Invitation from "../models/Invitation.js";
import User from "../models/User.js";
import Workspace from "../models/Workspace.js";

const sendInvitation = async (req, res) => {
  const { workspaceId, fromId, fromName, email } = req.body;

  try {
    if (email && workspaceId) {
      const userExist = await User.findOne({ email });
      const workspaceExist = await Workspace.findById(workspaceId);

      if (!userExist) {
        res.json({
          status: "FAILED",
          err: "user doesn't exit!",
        });
      }
      if (userExist && workspaceExist) {
        const newInvitation = new Invitation({
          fromId,
          fromName,
          workspaceId,
          userId: userExist._id,
        });
        const response = await newInvitation.save();
        res.json({
          status: "SUCESS",
          data: response,
        });
      }
    } else {
      res.json({
        status: "FAILED",
        err: "args missing!",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.json({
      status: "FAILED",
      err: err.message,
    });
  }
};
const approveInvitation = async (req, res) => {
  const { userId } = req.params;
  const { invitationId } = req.body;

  try {
    const userExist = await User.findById(userId);
    const invitationExist = await Invitation.findById(invitationId);

    if (userExist && invitationExist) {
      const approvedInvitation = await Invitation.findByIdAndUpdate(
        invitationId,
        {
          $set: {
            isApproved: true,
            type: "approved",
          },
        }
      );
      if (approvedInvitation) {
        const userNotification = await Invitation.find();
        res.json({
          status: "SUCESS",
          data: userNotification,
        });
      }
    } else {
      console.log("User or invitation do not exist!");
    }
  } catch (error) {}
};
const getNotification = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      res.json({
        status: "FAILED",
        err: "para missing!",
      });
    }

    const userExist = await User.findById(userId);

    if (userExist) {
      const notifications = await Invitation.find({ userId });
      console.log(notifications);
      res.json({
        status: "SUCESS",
        data: notifications,
      });
    }
  } catch (err) {
    res.json({
      status: "FAILED",
      err: "args missing!",
    });
  }
};
const deleteNotification = async (req, res) => {
  const { notificationId } = req.params;
  console.log(notificationId);
  try {
    //check invitation exist
    const invitationExist = await Invitation.findById(notificationId);
    if (!invitationExist) {
      console.log("Notification doesn't exist!");
      res.json({
        status: "FAILED",
        err: "Notification doesn't exist!",
      });
      return;
    }
    // delete notification
    const { userId } = await Invitation.findOneAndDelete({
      _id: notificationId,
    });
    if (userId) {
      // return existing user notifications
      const userNotifications = await Invitation.find({ userId });

      res.json({
        status: "SUCCESS",
        data: userNotifications,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.json({
      status: "FAILED",
      err: err.message,
    });
  }
};
export {
  sendInvitation,
  getNotification,
  approveInvitation,
  deleteNotification,
};
