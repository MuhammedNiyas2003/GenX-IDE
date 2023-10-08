// import { useParams } from "react-router-dom";
import Editor from "../../components/Workspace/Editor";
import Explorer from "../../components/Workspace/Explorer";
import Split from "react-split";
import "./style.css";

const Workspace = () => {
  // const { projectId } = useParams();
  
  return (
    <div className="workspace-container">
      <Split onDrag={(e)=>console.log(e)} gutterSize={1} className="main-split">
        <Explorer />
        <Editor />
      </Split>
    </div>
  );
};

export default Workspace;
