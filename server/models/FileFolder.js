import mongoose from "mongoose";

const FileFolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
  },
});

const FileFolder = mongoose.model("FileFolder", FileFolderSchema);
export default FileFolder;
