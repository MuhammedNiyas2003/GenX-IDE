import { useState } from "react";
import { hideIcon, showIcon } from "../../../contants/icons";
import "./style.scss";

const InputBox = ({
  label,
  type,
  placeholder,
  value,
  setValue,
  RightItem,
  LeftIcon,
  isFull,
  leftAction,
  style,
}) => {
  const [isShown, setIsShown] = useState(true);
  const isPassword = type === "password";

  return (
    <div className="input-box-container">
      <div style={{ width: isFull ? '100%' : '90%'}} className="label-container">
        <label>{label}</label>
      </div>
      <div style={{ width: isFull ? '100%' : '90%'}} className="input-box-input">
        {RightItem && <RightItem />}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={!isPassword ? type : isPassword && isShown && "password"}
          placeholder={placeholder}
        />
        {isPassword && (
          <div onClick={() => setIsShown(!isShown)} className="input-eye">
            {isShown ? (
              <img src={showIcon} alt="show-password" />
            ) : (
              <img src={hideIcon} alt="hide-password" />
            )}
          </div>
        )}
        {LeftIcon && (
          <div className="input-box-left-icon">
            <img src={LeftIcon} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputBox;
