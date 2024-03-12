import FileFolder from "../models/FileFolder.js";

const getFileFolders = async (req, res) => {
  const { workspaceId } = req.params;

  const workspaceFileFolders = await FileFolder.find({ workspaceId });

  const itemsByParent = {};

  workspaceFileFolders.forEach((fileFolder) => {
    const parentId = fileFolder.parentId || "root";
    itemsByParent[parentId] = itemsByParent[parentId] || [];
    itemsByParent[parentId].push(fileFolder);
  });

  // // Recursive function to build the JSON structure
  const buildStructure = (parentId) => {
    const children = itemsByParent[parentId] || [];
    return children.map((child) => {
      const { _id, name, type, code } = child;
      return {
        _id,
        name,
        type,
        code: code ? code : "",
        children: buildStructure(_id),
      };
    });
  };
  // Start building the JSON structure from the root
  const jsonData = {
    name: "Project",
    type: "folder",
    children: buildStructure("root"), // Pass null as the root's parent ID
  };

  console.log(JSON.stringify(jsonData, null, 2));
  res.json({
    status: "SUCESS",
    data: jsonData,
  });
};
const createFileFolder = async (req, res) => {
  const { name, type, parentId, workspaceId, code } = req.body;

  try {
    const newFileFolder = new FileFolder({
      name,
      type,
      parentId,
      workspaceId,
      code,
    });
    const savedFileFolder = await newFileFolder.save();
    res.json(savedFileFolder);
  } catch (error) {
    console.log(error);
  }
};

export { getFileFolders, createFileFolder };
