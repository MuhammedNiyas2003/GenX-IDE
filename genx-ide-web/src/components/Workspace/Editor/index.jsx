import Split from "react-split";
import "./style.css";
import CodeEditor from "../CodeEditor";
import Compiler from "../Compiler";

const Editor = () => {
  return (
    <Split
      gutterSize={1}
      className="split"
      direction="vertical"
      sizes={[80, 20]}
    >
      <CodeEditor />
      <Compiler />
    </Split>
  );
};

export default Editor;
