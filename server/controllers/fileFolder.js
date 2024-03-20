import FileFolder from "../models/FileFolder.js";

const getFileFolders = async (req, res) => {
  const { workspaceId } = req.params;

  const workspaceFileFolders = await FileFolder.find({ workspaceId });
  const convertData = (data) => {
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
        code: item?.code,
      };
    });
    return filter;
  };
  const data = convertData(workspaceFileFolders);
  res.json({
    status: "SUCESS",
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
    if (savedFileFolder) {
      const workspaceFileFolders = await FileFolder.find({ workspaceId });
      const convertData = (data) => {
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
            code: item?.code,
          };
        });
        return filter;
      };
      const data = convertData(workspaceFileFolders);
      res.json({
        status: "SUCCESS",
        data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { getFileFolders, createFileFolder };
