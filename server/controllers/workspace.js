import User from "../models/User.js";
import Workspace from "../models/Workspace.js";

const createWorkspace = async (req, res) => {
  const { name, language, admin, collaborators } = req.body;
  try {
    const newWorkspace = new Workspace({
      name,
      language,
      admin,
      collaborators,
    });
    const workspaceCreated = await newWorkspace.save();
    await User.findByIdAndUpdate(admin, {
      $push: { workspaces: workspaceCreated._id },
    });
    res.json({
      status: "SUCESS",
      data: workspaceCreated,
    });
  } catch (err) {
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
export { createWorkspace, getRecentWorkspaces, getWorkspace };
