import { useEffect } from "react";
import "./style.scss";
import { DiCss3, DiJavascript, DiNpm } from "react-icons/di";
import { FaList, FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import TreeView from "react-accessible-treeview";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentCode,
  setCurrentFile,
  setFileFolder,
} from "../../../state/reducers/workspaceSlice";
import { setPoints } from "../../../state/reducers/contextMenuSlice";
import axios from "axios";

function Explorer() {
  const dispatch = useDispatch();

  const { fileFolders, currentWorkspace } = useSelector(
    (state) => state.workspace
  );

  function flattenStructure(node, idCounter = { value: 0 }, parentId = null) {
    const flatNode = {
      id: idCounter.value++,
      _id: node._id,
      name: node.name,
      parent: parentId,
      meta: null,
      type: node.type,
      code: node?.code,
      children: [],
    };

    let result = [flatNode];

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const childNodes = flattenStructure(child, idCounter, flatNode.id);
        result = result.concat(childNodes);
        flatNode.children.push(...childNodes.map((childNode) => childNode.id));
      }
    }

    return result;
  }
  let flatStructure;
  useEffect(() => {
    flatStructure = flattenStructure(fileFolders);
    console.log("file", flatStructure);
  }, []);

  const onFileSelect = async (element) => {
    console.log("explore update");
    try {
      //update fileFolders
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/file-folder/${
          currentWorkspace?._id
        }`
      );
      dispatch(setFileFolder(response.data.data));
    } catch (err) {
      console.log(err);
    }
    if (element.type === "file") {
      dispatch(setCurrentCode(element?.code));
      console.log("element clicked", element?.id);
      dispatch(setCurrentFile(element?.id));
    }
  };

  const setSeletedElement = (e, element) => {
    e.preventDefault();
    dispatch(setPoints({ x: e.pageX, y: e.pageY, item: element }));
  };
  return (
    <div>
      <div className="directory">
        <TreeView
          data={fileFolders}
          aria-label="file-folders-tree"
          onNodeSelect={({ element }) => onFileSelect(element)}
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
          }) => (
            <div
              onContextMenu={(e) => setSeletedElement(e, element)}
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
