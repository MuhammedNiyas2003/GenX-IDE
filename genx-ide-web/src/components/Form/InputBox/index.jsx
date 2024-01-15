import "./style.scss";

const InputBox = ({ label, type, placeholder }) => {
  return (
    <div className="input-box-container">
      <div className="label-container">
        <label>{label}</label>
      </div>
      <input type={type} placeholder={placeholder} />
    </div>
  );
};

export default InputBox;
