import { useEffect, useRef } from "react";
import "./style.css";
import * as monaco from "monaco-editor";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  // const editorRef = useRef(null);
  // useEffect(() => {
  //   const editor = monaco.editor.create(editorRef.current, {
  //     value: 'function hello() {\n\tconsole.log("Hello, Monaco Editor!");\n}',
  //     language: "javascript",
  //     theme: "vs-dark",
  //   });

  //   return () => {
  //     editor.dispose();
  //   };
  // }, []);

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
