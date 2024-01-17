import './style.scss';

const Button = ({ onClick }) => {
  return (
    <div className="btn-container" onClick={onClick}>
      <p>Sign In</p>
    </div>
  );
};

export default Button;
