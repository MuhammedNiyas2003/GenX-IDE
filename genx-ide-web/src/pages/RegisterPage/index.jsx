import { Link } from "react-router-dom";
import "./style.scss";
import InputBox from "../../components/Form/InputBox";
import Button from "../../components/Button/index"
const Register = () => {
  return (
    <div>
      Register
      <Link to="/login">
        <button>Login</button>
      </Link>
      <div className="login-container">
        <div className="login-card">
          <InputBox
            label="Your Email"
            placeholder="Enter your email"
            type="email"
          />
          <InputBox
            label="Username"
            placeholder="Enter your username"
            type="text"
          />
          <InputBox label="Password" placeholder="password" type="password" />
          <Button/>
          <h6 className="login-or-divider">OR</h6>
        </div>
      </div>
    </div>
  );
};

export default Register;
