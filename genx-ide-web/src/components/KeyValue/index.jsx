import "./style.scss";
import { Button } from "@adobe/react-spectrum";
import InputBox from "../Form/InputBox";
import { useEffect, useState } from "react";

const KeyValue = ({ item, index, onChange, onRemove, type }) => {
  const [key, setKey] = useState(item.key);
  const [value, setValue] = useState(item.value);

  useEffect(() => {
    onChange(index, "key", key, type);
  }, [key]);

  useEffect(() => {
    onChange(index, "value", value, type);
  }, [value]);

  return (
    <div className="key-value-container">
      <InputBox value={key} setValue={setKey} placeholder="Key" />
      <InputBox value={value} setValue={setValue} placeholder="Value" />
      <Button onPress={onRemove}>Remove</Button>
    </div>
  );
};

export default KeyValue;
