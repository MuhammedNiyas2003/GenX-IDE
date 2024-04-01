import "./style.scss";
import { useEffect, useState } from "react";

const SelectBox = ({ currentOption, setCurrentOption, options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  useEffect(() => {
    console.log(selectedOption.value);
  }, [selectedOption]);

  return (
    <select
      style={{}}
      className="selectbox-container"
      onChange={(e) => setCurrentOption(e.target.value)}
    >
      {options?.map((option) => (
        <option value={option.value}>{option.req}</option>
      ))}
    </select>
  );
};

export default SelectBox;
