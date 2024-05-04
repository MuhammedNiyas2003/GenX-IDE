import "./style.css";
import Editor from "@monaco-editor/react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCode } from "../../../state/reducers/workspaceSlice.js";
import socket from "../../../utils/socket/socket.js";

const CodeEditor = () => {
  const { currentCode, currentFile } = useSelector((state) => state.workspace);

  const dispatch = useDispatch();

  function onCodeChangeHandler(value) {
    if (currentFile) {
      socket.emit("cloud-saving", { code: value, id: currentFile });
    }
    dispatch(setCurrentCode(value));
  }
  return (
    <Editor
      height="100vh"
      width="100%"
      defaultLanguage="javascript"
      onChange={onCodeChangeHandler}
      value={currentCode}
      theme="vs-dark"
      options={{
        mouseWheelScrollSensitivity: 0.5,
      }}
    />
  );
};

export default CodeEditor;
