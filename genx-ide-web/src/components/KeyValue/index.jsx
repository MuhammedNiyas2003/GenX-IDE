import './style.scss'
import { Button } from "@adobe/react-spectrum";
import InputBox from "../Form/InputBox";


const KeyValue = () => {
  return (
    <div className="key-value-container">
      <InputBox placeholder="Key" />
      <InputBox placeholder="Value" />
      <Button >Add</Button>
    </div>
  );
};

export default KeyValue;
