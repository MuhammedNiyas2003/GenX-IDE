import axios from "axios";
import "./style.scss";
import { useState } from "react";

const Compiler = () => {
  const [code, setCode] = useState("let a = 'faris'; console.log(a);");
  const [isCompiling, setIsCompiling] = useState(false);
  const [output, setOutput] = useState("");

  const compileCode = async () => {
    setIsCompiling(true);
    const response = await axios.post(
      "http://localhost:3001/api/compiler/submit-code",
      { code }
    );
    setIsCompiling(false);
    console.log(response.data);
    setOutput(response.data.compileResponse.output);
  };

  return (
    <div className="compiler-container">
      <button onClick={compileCode}>compiler code</button>
      {isCompiling && <p style={{ color: "black" }}>compiling...</p>}
      <p style={{ color: "black" }}>output : {output}</p>
    </div>
  );
};

export default Compiler;
