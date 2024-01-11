import "./style.scss";

interface Props {
  label: string;
  type: string;
  placeholder: string;
}
const InputBox = ({ label, type, placeholder }: Props) => {
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
