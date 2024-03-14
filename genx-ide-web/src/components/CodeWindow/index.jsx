import SelectBox from "../Form/SelectBox";
import "./style.scss";
import { Editor } from "@monaco-editor/react";

const CodeWindow = ({ value, setValue }) => {
  const reqList = [
    {
      id: "01",
      req: "Javascript",
    },
    {
      id: "02",
      req: "Python",
    },
    {
      id: "03",
      req: "Java",
    },
    {
      id: "04",
      req: "C++",
    },
    {
      id: "05",
      req: "C",
    },
    {
      id: "06",
      req: "PHP",
    },
    {
      id: "07",
      req: "Go",
    },
    {
      id: "08",
      req: "Swift",
    },
    {
      id: "09",
      req: "R",
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
        defaultLanguage="python"
        theme="vs-dark"
        value={value}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
};

export default CodeWindow;
