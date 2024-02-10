import SelectBox from "../Form/SelectBox";
import "./style.scss";
import { Editor } from "@monaco-editor/react";

const CodeWindow = () => {
  const reqList = [
    {
      id: "01",
      req: "Javascript",
      value: "js",
    },
    {
      id: "02",
      req: "Python",
      value: "py",
    },
    {
      id: "03",
      req: "Java",
      value: "java",
    },
    {
      id: "04",
      req: "C++",
      value: "c++",
    },
  ];
  return (
    <div className="codewindow-container">
      <div className="codewindow-action-container">
        <SelectBox data={reqList} />
      </div>
      <Editor
        height="100%"
        width="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
      />
    </div>
  );
};

export default CodeWindow;
