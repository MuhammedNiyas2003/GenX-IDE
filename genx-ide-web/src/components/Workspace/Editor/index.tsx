import Split from "react-split";
import "./style.css";
import CodeEditor from "../CodeEditor";
const Editor = () => {
  return (
    <Split gutterSize={1} className="split" direction="vertical">
      <CodeEditor />
      <div></div>
    </Split>
  );
};

export default Editor;
