import "./style.css";
import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCode } from "../../../state/reducers/workspaceSlice.js";
import { useEffect, useState } from "react";

const CodeEditor = () => {
  const { currentCode } = useSelector((state) => state.workspace);
  
  const dispatch = useDispatch();

  function onCodeChange(value) {
    dispatch(setCurrentCode(value));
  }
  return (
    <Editor
      height="100vh"
      width="100%"
      defaultLanguage="javascript"
      onChange={onCodeChange}
      value={currentCode}
      theme="vs-dark"
      options={{
        mouseWheelScrollSensitivity: 0.5,
      }}
    />
  );
};

export default CodeEditor;
