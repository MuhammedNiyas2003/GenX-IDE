import User from "../models/User.js";
import Explore from "../models/Explore.js";
import Workspace from "../models/Workspace.js";

const getAllPost = async (req, res) => {
  try {
    const allPost = await Explore.find();
    res.status(200).json(allPost);
  } catch (error) {
    console.log(error);
  }
};
const createPost = async (req, res) => {
  console.log(req.body, "Explore data");
  const { userId, workspaceId } = req.body;
  try {
    const isUserExist = await User.findById(userId);
    const isWorkspaceExist = await Workspace.findById(workspaceId);

    if (isUserExist && isWorkspaceExist) {
      const isAlreadyPosted = await Explore.findOne({ workspaceId });
      if (isAlreadyPosted) {
        console.log("Workspace already published!");
        return res.status(403).json("Workspace already published!");
      } else {
        const newPost = new Explore(req.body);
        const newPostCreated = await newPost.save();

        if (newPostCreated) {
          res.status(201).json(newPostCreated);
        } else {
          console.log("Something went wrong!");
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const isUserExist = await User.findById(userId);
    if (isUserExist) {
      const userPost = await Explore.find({ userId });
      console.log(userPost);
      return res.status(200).json(userPost);
    }
  } catch (error) {
    console.log(error);
  }
};

export { getAllPost, createPost, getUserPosts };
