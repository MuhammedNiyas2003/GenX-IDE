import "./style.scss";
import { useEffect, useState } from "react";

const SelectBox = ({ currentOption, setCurrentOption, options }) => {
  return (
    <select
      style={{}}
      className="selectbox-container"
      onChange={(e) => setCurrentOption(e.target.value)}
      value={currentOption}
    >
      {options?.map((option) => (
        <option value={option.value}>{option.req}</option>
      ))}
    </select>
  );
};

export default SelectBox;
