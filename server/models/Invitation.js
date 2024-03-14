import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    type: {
      type: String,
      default:"invite"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    fromName: {
      type: String,
    },
    fromId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Invitation = mongoose.model("Invitation", invitationSchema);
export default Invitation;
