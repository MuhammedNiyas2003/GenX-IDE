// import { useParams } from "react-router-dom";
import Editor from "../../components/Workspace/Editor";
import Explorer from "../../components/Workspace/Explorer";
import Split from "react-split";
import "./style.css";
import { useEffect, useState } from "react";

const Workspace = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    console.log(isDragging);
  }, [isDragging]);

  return (
    <div className="workspace-container">
      <Split
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        gutterSize={1}
        className="main-split"
        sizes={[15, 80]}
      >
        <Explorer />
        <Editor />
      </Split>
    </div>
  );
};

export default Workspace;
