import "./style.scss";

const InputBox = ({ label, type, placeholder, value, setValue, RightItem }) => {
  return (
    <div className="input-box-container">
      <div className="label-container">
        <label>{label}</label>
      </div>
      <div className="input-box-input">
        {
          RightItem && <RightItem/>
        }
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          placeholder={placeholder}
        />
        {type === "password" && <div className="input-eye">eye</div>}
      </div>
    </div>
  );
};

export default InputBox;
