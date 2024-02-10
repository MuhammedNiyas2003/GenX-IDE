import "./style.scss";
import styles from "./style.module.scss";

const Button = ({
  onClick,
  text = "Button",
  variant = "primary",
  size = "small",
}) => {
  return (
    <div
      className={`btn-container ${styles[variant]} ${styles[size]}`}
      onClick={onClick}
    >
      <p>{text}</p>
    </div>
  );
};

export default Button;
