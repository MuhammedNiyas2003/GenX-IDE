// import { useParams } from "react-router-dom";
import Editor from "../../components/Workspace/Editor";
import Explorer from "../../components/Workspace/Explorer";
import Split from "react-split";
import "./style.scss";
import { useEffect, useState } from "react";

const Workspace = () => {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    console.log(isDragging);
  }, [isDragging]);

  return (
    <Split
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      gutterSize={1}
      className="main-split"
      sizes={[16, 80]}
    >
      <Explorer />
      <Editor />
    </Split>
  );
};

export default Workspace;
