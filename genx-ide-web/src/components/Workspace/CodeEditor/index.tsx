import "./style.css";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue='const test = () => {
        console.log("testing");
      };
      '
      theme="vs-dark"
    />
  );
};

export default CodeEditor;
