import axios from "axios";
import { useState, useEffect } from "react";
import "./style.scss";
import Header from "../../components/Header/index.jsx";
import CodeWindow from "../../components/CodeWindow/index.jsx";
import { Button, Heading as SpectrumHeader } from "@adobe/react-spectrum";

const CodeConvertor = () => {
  const [sourceCode, setSourceCode] = useState(null);
  const [source, setSource] = useState("javascript");
  const [destination, setDestination] = useState("python");
  const [generatedCode, setGeneratedCode] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const convertHandler = async () => {
    setIsLoading(true);
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
      console.log(response);
      setGeneratedCode(response.data);
      return;
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(sourceCode, source, destination);
  }, [sourceCode, source, destination]);

  return (
    <div className="codeconverter-container">
      <Header
        leftItem={<SpectrumHeader level={3}>Code Converter</SpectrumHeader>}
        rightItem={
          <Button
            isPending={isLoading}
            variant="accent"
            style="fill"
            onPress={convertHandler}
          >
            Convert
          </Button>
        }
      />
      <div className="editor-window-container">
        <CodeWindow setValue={setSourceCode} value={sourceCode} size="half" />
        <CodeWindow
          // setValue={setGeneratedCode}
          // value={generatedCode}
          size="half"
        />
      </div>
    </div>
  );
};

export default CodeConvertor;
