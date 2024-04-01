import { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { ActionButton, Button } from "@adobe/react-spectrum";
import Bell from "@spectrum-icons/workflow/Bell";
import Play from "@spectrum-icons/workflow/Play";
import Pause from "@spectrum-icons/workflow/Pause";

const Compiler = () => {
  const [code, setCode] = useState("let a = 'faris'; console.log(a);");
  const [isCompiling, setIsCompiling] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const { currentCode } = useSelector((state) => state.workspace);

  useEffect(() => {
    setCode(currentCode);
  }, [currentCode]);

  const compileCodeHandler = async () => {
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
      <div className="compiler-top-container">
        <div className="compiler-top-left">
          <Button
            isPending={isCompiling}
            UNSAFE_style={{ border: "none" }}
          ></Button>
        </div>
        <div className="compiler-top-right">
          <ActionButton
            onPress={compileCodeHandler}
            marginX={20}
            staticColor="white"
            isQuiet
          >
            {isCompiling ? (
              <Pause UNSAFE_style={{ opacity: 0.5 }} size="S" />
            ) : (
              <Play UNSAFE_style={{ opacity: 0.5 }} size="S" />
            )}
          </ActionButton>
        </div>
      </div>
      {isCompiling && <p>compiling...</p>}
      <p>Output : {output}</p>
      <p>
        Error : <span style={{ color: "red" }}>{error}</span>
      </p>
    </div>
  );
};

export default Compiler;
