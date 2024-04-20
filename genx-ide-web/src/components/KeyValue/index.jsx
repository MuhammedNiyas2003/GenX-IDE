import "./style.scss";
import { Button } from "@adobe/react-spectrum";
import InputBox from "../Form/InputBox";
import { useEffect, useState } from "react";

const KeyValue = ({ item, queryParams, setParams }) => {
  const [key, setKey] = useState(item.key);
  const [value, setValue] = useState(item.value);

  useEffect(() => {
    console.log(item);
  }, []);

  useEffect(() => {
    // setParams(state=>[...state,key:item.id ===])
  }, [key, value]);

  return (
    <div className="key-value-container">
      <InputBox value={key} setValue={setKey} placeholder="Key" />
      <InputBox value={value} setValue={setValue} placeholder="Value" />
      <Button>Remove</Button>
    </div>
  );
};

export default KeyValue;
