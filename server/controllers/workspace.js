import User from "../models/User.js";
import Workspace from "../models/Workspace.js";
import FileFolder from "../models/FileFolder.js";

const createWorkspace = async (req, res) => {
  const { name, language, admin, collaborators, desc } = req.body;
  try {
    const newWorkspace = new Workspace({
      name,
      language,
      desc,
      admin,
      collaborators,
    });

    const workspaceCreated = await newWorkspace.save();
    await User.findByIdAndUpdate(admin, {
      $push: { workspaces: workspaceCreated._id },
    });
    if (workspaceCreated) {
      const rootFile = new FileFolder({
        name: "root",
        type: "folder",
        workspaceId: workspaceCreated._id,
      });
      await rootFile.save();
    }
    res.json({
      status: "SUCESS",
      data: workspaceCreated,
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "FAILED",
      err,
    });
  }
};
const getRecentWorkspaces = async (req, res) => {
  const { userId } = req.params;
  const getUserWorkspaces = await Workspace.find({ admin: userId });
  console.log(getUserWorkspaces);
};
const getWorkspace = async (req, res) => {
  const { workspaceId } = req.params;

  try {
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      res.json({
        status: "FAILED",
        data: "Workspace not exist!",
      });
    } else {
      res.json({
        status: "SUCESS",
        data: workspace,
      });
    }
  } catch (err) {
    res.json({
      status: "FAILED",
      data: err.msg,
    });
  }
};
const updateWorkspaceDetails = async (req, res) => {
  const { workspaceId } = req.params;
  const { name, desc, language } = req.body;

  try {
    if (workspaceId) {
      const workspace = await Workspace.findById(workspaceId);
      if (workspace) {
        const updatedWorkspace = await Workspace.findOneAndUpdate(
          { _id: workspaceId },
          { $set: { desc, language, name } },
          { new: true }
        );
        console.log(updatedWorkspace);
        res.json({
          status: "SUCESS",
          data: updatedWorkspace,
        });
      } else {
        console.log("invalid workspace id");
      }
    } else {
      console.log("workspace id not provided!");
    }
  } catch (err) {
    res.json({
      status: "FAILED",
      err,
    });
  }
};
export {
  createWorkspace,
  getRecentWorkspaces,
  getWorkspace,
  updateWorkspaceDetails,
};
