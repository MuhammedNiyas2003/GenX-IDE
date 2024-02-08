import axios from "axios";
import "./style.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Compiler = () => {
  const [code, setCode] = useState("let a = 'faris'; console.log(a);");
  const [isCompiling, setIsCompiling] = useState(false);
  const [output, setOutput] = useState("");
  const [error,setError] = useState("")

  const { currentCode } = useSelector((state) => state.workspace);

  useEffect(() => {
    setCode(currentCode);
  }, [currentCode]);

  const compileCode = async () => {
    setIsCompiling(true);
    const response = await axios.post(
      "http://localhost:3001/api/compiler/submit-code",
      { code: currentCode }
    );
    setIsCompiling(false);
    console.log(response.data);
    setOutput(response.data.compileResponse.output);
    setError(response.data.compileResponse.error);
  };

  return (
    <div className="compiler-container">
      <button onClick={compileCode}>compiler code</button>
      {isCompiling && <p>compiling...</p>}
      <p>output : {output}</p>
      <p>error : {error}</p>
    </div>
  );
};

export default Compiler;
