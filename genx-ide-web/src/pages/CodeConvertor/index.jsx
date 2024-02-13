import { useState, useEffect } from "react";
import "./style.scss";
import Header from "../../components/Header/index.jsx";
import CodeWindow from "../../components/CodeWindow/index.jsx";
import { Button, Heading as SpectrumHeader } from "@adobe/react-spectrum";
import axios from "axios";

const CodeConvertor = () => {
  const [sourceCode, setSourceCode] = useState(null);
  const [source, setSource] = useState("javascript");
  const [destination, setDestination] = useState("python");
  const [generatedCode, setGeneratedCode] = useState(null);
  const convertHandler = async () => {
    const formData = {
      sourceCode,
      source,
      destination,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/openai/covert-code`,
        formData
      );
      console.log(response.data);
      setGeneratedCode(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(sourceCode);
  }, [sourceCode]);

  return (
    <div className="codeconverter-container">
      <Header
        leftItem={<SpectrumHeader level={3}>Code Converter</SpectrumHeader>}
        rightItem={
          <Button variant="accent" style="fill" onPress={convertHandler}>
            Convert
          </Button>
        }
      />
      <div className="editor-window-container">
        <CodeWindow setValue={setSourceCode} value={sourceCode} size="half" />
        <CodeWindow
          setValue={setGeneratedCode}
          value={generatedCode}
          size="half"
        />
      </div>
    </div>
  );
};

export default CodeConvertor;
