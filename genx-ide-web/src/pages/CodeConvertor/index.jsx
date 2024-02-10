import "./style.scss";
import Header from "../../components/Header/index.jsx";
import CodeWindow from "../../components/CodeWindow/index.jsx";
import { Button, Heading as SpectrumHeader } from "@adobe/react-spectrum";

const CodeConvertor = () => {
  const convertHandler = () => {};
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
        <CodeWindow size="half" />
        <CodeWindow size="half" />
      </div>
    </div>
  );
};

export default CodeConvertor;
