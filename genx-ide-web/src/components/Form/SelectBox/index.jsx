import "./style.scss";
import { useEffect, useState } from "react";

const SelectBox = ({ data }) => {
  const [selectedOption, setSelectedOption] = useState(data[0]);
  useEffect(() => {
    console.log(selectedOption.value);
  }, [selectedOption]);

  return (
    <select
      style={{}}
      className="selectbox-container"
      onChange={(e) => setSelectedOption(e.target.value)}
    >
      {data.map((item) => (
        <option value={item}>{item.value}</option>
      ))}
    </select>
  );
};

export default SelectBox;
