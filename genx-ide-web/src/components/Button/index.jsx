import "./style.scss";

const Button = ({ onClick, text = "Button" }) => {
  return (
    <div className="btn-container" onClick={onClick}>
      <p>{text}</p>
    </div>
  );
};

export default Button;
