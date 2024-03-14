import { useState } from "react";
import axios from "axios";
import "./style.scss";
import { Button, Heading, View } from "@adobe/react-spectrum";
//comp
import Header from "../../components/Header/index.jsx";
import InputBox from "../../components/Form/InputBox/index.jsx";
const CodeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const generateHandler = async () => {
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
      <View><p>{response}</p></View>
    </div>
  );
};

export default CodeGenerator;
