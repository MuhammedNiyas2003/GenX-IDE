import FileFolder from "../models/FileFolder.js";

const getFileFolders = async (req, res) => {
  const { workspaceId } = req.params;

  const workspaceFileFolders = await FileFolder.find({ workspaceId });
  function convertData(data) {
    // const result = [];
    const filter = data.map((item) => {
      const parent = item.parentId ? item.parentId : null;
      const { _id } = item;
      const children = data.filter((child) => {
        const child2 = child?.parentId?.toString() === _id.toString();
        if (child2) {
          return child2;
        }
      });
      const filteredChildren = children.map((item) => item._id);
      return {
        id: item._id,
        name: item.name,
        type: item.type,
        workspaceId: item.workspaceId,
        parent,
        children: filteredChildren,
        code: item?.code
      };
    });
    return filter;
  }

  // const itemsByParent = {};

  // workspaceFileFolders.forEach((fileFolder) => {
  //   const parentId = fileFolder.parentId || "root";
  //   itemsByParent[parentId] = itemsByParent[parentId] || [];
  //   itemsByParent[parentId].push(fileFolder);
  // });

  // const buildStructure = (parentId) => {
  //   const children = itemsByParent[parentId] || [];
  //   return children.map((child) => {
  //     const { _id, name, type, code } = child;
  //     return {
  //       _id,
  //       name,
  //       type,
  //       code: code ? code : "",
  //       children: buildStructure(_id),
  //     };
  //   });
  // };
  // const jsonData = {
  //   name: "Project",
  //   type: "folder",
  //   children: buildStructure("root"),
  // };

  // console.log(JSON.stringify(jsonData, null, 2));
  const data = convertData(workspaceFileFolders);
  res.json({
    status: "SUCESs",
    data,
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
