import { useState } from "react";
import "./style.css";
import Editor from "@monaco-editor/react";
import { useDispatch } from "react-redux";
import { setCurrentCode } from "../../../state/reducers/workspaceSlice.js";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  function onCodeChange(value) {
    console.log(value);
    setCode(value);
    dispatch(setCurrentCode(value));
  }
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      onChange={onCodeChange}
      defaultValue={code}
      theme="vs-dark"
    />
  );
};

export default CodeEditor;
