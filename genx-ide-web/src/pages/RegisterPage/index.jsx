import "./style.scss";
import { useNavigate } from "react-router-dom";
import InputBox from "../../components/Form/InputBox";
import { Button } from "@adobe/react-spectrum";

const Register = ({}) => {
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-welcome">
          <h3>Create Account</h3>
          <p>Sign Up to create account</p>
        </div>
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
        <Button onPress={() => navigate("/set-profile")} variant="accent">
          Sign Up
        </Button>
        <h6 className="login-or-divider">OR</h6>
      </div>
    </div>
  );
};

export default Register;
