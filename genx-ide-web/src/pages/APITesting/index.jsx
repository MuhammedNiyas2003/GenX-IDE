import { useState } from "react";
import "./style.scss";
//comp
import InputBox from "../../components/Form/InputBox";
import SelectBox from "../../components/Form/SelectBox";

const APITesting = () => {
  const [url, setUrl] = useState("");
  const reqList = [
    {
      id: "01",
      req: "GET",
      value: "GET",
      color: 'green'
    },
    {
      id: "02",
      req: "POST",
      value: "POST",
      color: 'red'
    },
    {
      id: "03",
      req: "PUT",
      value: "PUT",
      color: 'yellow'

    },
    {
      id: "04",
      req: "DELETE",
      color: 'blue'
    },
  ];
  return (
    <div className="api-container">
      <InputBox
        label="test"
        placeholder="test"
        type="text"
        value={url}
        setUrl={setUrl}
        RightItem={() => <SelectBox data={reqList} />}
      />
    </div>
  );
};

export default APITesting;
