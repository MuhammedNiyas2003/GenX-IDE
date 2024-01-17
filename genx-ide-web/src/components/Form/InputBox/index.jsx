import "./style.scss";

const InputBox = ({ label, type, placeholder, value, setValue }) => {
  return (
    <div className="input-box-container">
      <div className="label-container">
        <label>{label}</label>
      </div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputBox;
