import { Heading } from "@adobe/react-spectrum";
import Header from "../../components/Header/index.jsx";
import "./style.scss";
const CodeGenerator = () => {
  return (
    <div className="codegenerator-container">
      <Header leftItem={<Heading level={3}>Ai Code Generator</Heading>} />
    </div>
  );
};

export default CodeGenerator;
