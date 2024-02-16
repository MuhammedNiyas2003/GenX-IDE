import React, { useState, useEffect } from "react";
import { DiCss3, DiJavascript, DiNpm } from "react-icons/di";
import { FaList, FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import TreeView, { flattenTree } from "react-accessible-treeview";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { setFileFolder } from "../../../state/reducers/workspaceSlice";
import axios from "axios";

const folder = {
  name: "",
  children: [
    {
      name: "src",
      children: [{ name: "index.js" }, { name: "styles.css" }],
    },
    {
      name: "node_modules",
      children: [
        {
          name: "react-accessible-treeview",
          children: [{ name: "index.js" }],
        },
        { name: "react", children: [{ name: "index.js" }] },
      ],
    },
    {
      name: ".npmignore",
    },
    {
      name: "package.json",
    },
    {
      name: "webpack.config.js",
    },
  ],
};

function Explorer() {
  // const [fileFolders, setFileFolders] = useState(null);
  // const data = flattenTree(fileFolders);
  const { _id: workspaceId } = useSelector(
    (state) => state.workspace.currentWorkspace
  );
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const getFileFolders = async () => {
    try {
      const fileFolderResponse = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/file-folder/${workspaceId}`
      );
      const { status: FileFolderStatus, data: FileFolderData } =
        fileFolderResponse.data;
      console.log(fileFolderResponse.data, "file folder render");
      if (FileFolderStatus === "SUCESS") {
        setData(flattenTree(FileFolderData));
        dispatch(setFileFolder(FileFolderData));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getFileFolders();
  }, []);
  return (
    <div>
      <div className="directory">
        {!isLoading && (
          <TreeView
            data={data}
            aria-label="directory tree"
            nodeRenderer={({
              element,
              isBranch,
              isExpanded,
              getNodeProps,
              level,
            }) => (
              <div
                {...getNodeProps()}
                style={{ paddingLeft: 20 * (level - 1) }}
              >
                {isBranch ? (
                  <FolderIcon isOpen={isExpanded} />
                ) : (
                  <FileIcon filename={element.name} />
                )}

                {element.name}
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
}

const FolderIcon = ({ isOpen }) =>
  isOpen ? (
    <FaRegFolderOpen color="e8a87c" className="icon" />
  ) : (
    <FaRegFolder color="e8a87c" className="icon" />
  );

const FileIcon = ({ filename }) => {
  const extension = filename.slice(filename.lastIndexOf(".") + 1);
  switch (extension) {
    case "js":
      return <DiJavascript color="yellow" className="icon" />;
    case "css":
      return <DiCss3 color="turquoise" className="icon" />;
    case "json":
      return <FaList color="yellow" className="icon" />;
    case "npmignore":
      return <DiNpm color="red" className="icon" />;
    default:
      return null;
  }
};

export default Explorer;
