import SelectBox from "../Form/SelectBox";
import "./style.scss";
import { Editor } from "@monaco-editor/react";

const CodeWindow = ({ currentOption, setCurrentOption, options,value,setValue }) => {
  return (
    <div className="codewindow-container">
      <div className="codewindow-action-container">
        <SelectBox
          currentOption={currentOption}
          setCurrentOption={setCurrentOption}
          options={options}
        />
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
