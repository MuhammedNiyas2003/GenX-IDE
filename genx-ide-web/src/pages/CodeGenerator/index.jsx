import { useState } from "react";
import axios from "axios";
import "./style.scss";
import { Button, Heading, View } from "@adobe/react-spectrum";
//comp
import Header from "../../components/Header/index.jsx";
import InputBox from "../../components/Form/InputBox/index.jsx";
import { Editor } from "@monaco-editor/react";
const CodeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const generateHandler = async () => {
    setIsLoading(true);
    try {
      if (prompt !== "") {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/geminiai/assistant`,
          { prompt }
        );

        const { status, data } = response.data;
        if (status === "SUCCESS") {
          setResponse(data);
        }
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="codegenerator-container">
      <Header leftItem={<Heading level={3}>Ai Code Generator</Heading>} />
      <InputBox
        placeholder="Enter a prompt here"
        type="text"
        value={prompt}
        setValue={setPrompt}
        LeftItem={() => (
          <Button
            isPending={isLoading}
            onPress={generateHandler}
            variant="cta"
            marginEnd={10}
          >
            Generate
          </Button>
        )}
      />
      <View>
        <Editor
          height="100vh"
          width="100%"
          defaultLanguage="javascript"
          value={response}
          theme="vs-dark"
          options={{
            mouseWheelScrollSensitivity: 0.5,
          }}
        />
      </View>
    </div>
  );
};

export default CodeGenerator;
