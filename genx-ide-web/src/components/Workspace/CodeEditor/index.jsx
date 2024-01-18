import { useState } from "react";
import "./style.css";
import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCode } from "../../../state/reducers/workspaceSlice.js";

const CodeEditor = () => {
  const { currentCode } = useSelector(state=>state.workspace)
  const dispatch = useDispatch();

  function onCodeChange(value) {
    console.log(value);
    dispatch(setCurrentCode(value));
  }
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      onChange={onCodeChange}
      defaultValue={currentCode}
      theme="vs-dark"
    />
  );
};

export default CodeEditor;
