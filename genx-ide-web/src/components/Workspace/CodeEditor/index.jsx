import { useEffect, useRef } from "react";
import "./style.css";
import * as monaco from "monaco-editor";

const CodeEditor = () => {
  const editorRef = useRef(null);
  useEffect(() => {
    const editor = monaco.editor.create(editorRef.current, {
      value: 'function hello() {\n\tconsole.log("Hello, Monaco Editor!");\n}',
      language: "javascript",
      theme: "vs-dark",
    });

    return () => {
      editor.dispose();
    };
  }, []);

  return <div id="editor" ref={editorRef} style={{ height: "100%" }}></div>;
};

export default CodeEditor;
