import axios from "axios";
import { useState, useEffect } from "react";
import "./style.scss";
import Header from "../../components/Header/index.jsx";
import CodeWindow from "../../components/CodeWindow/index.jsx";
import { Button, Heading as SpectrumHeader } from "@adobe/react-spectrum";

const sourcelanguages = [
  {
    id: "01",
    req: "Javascript",
  },
  {
    id: "02",
    req: "Python",
  },
  {
    id: "03",
    req: "Java",
  },
  {
    id: "04",
    req: "C++",
  },
  {
    id: "05",
    req: "C",
  },
  {
    id: "06",
    req: "PHP",
  },
  {
    id: "07",
    req: "Go",
  },
  {
    id: "08",
    req: "Swift",
  },
  {
    id: "09",
    req: "R",
  },
];
const destinationlanguages = [
  {
    id: "01",
    req: "Python",
  },
  {
    id: "02",
    req: "Javascript",
  },
  {
    id: "03",
    req: "Java",
  },
  {
    id: "04",
    req: "C++",
  },
  {
    id: "05",
    req: "C",
  },
  {
    id: "06",
    req: "PHP",
  },
  {
    id: "07",
    req: "Go",
  },
  {
    id: "08",
    req: "Swift",
  },
  {
    id: "09",
    req: "R",
  },
];

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
        `${import.meta.env.VITE_SERVER_URL}/api/geminiai/convert-code`,
        formData
      );

      const { status, data } = response.data;
      if (status === "SUCCESS") {
        setGeneratedCode(data);
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(source, destination);
  }, [source, destination]);

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
        <CodeWindow
          options={sourcelanguages}
          currentOption={source}
          setCurrentOption={setSource}
          size="half"
          value={sourceCode}
          setValue={setSourceCode}
        />
        <CodeWindow
          setValue={setGeneratedCode}
          value={generatedCode}
          size="half"
          options={destinationlanguages}
          currentOption={destination}
          setCurrentOption={setDestination}
        />
      </div>
    </div>
  );
};

export default CodeConvertor;
