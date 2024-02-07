import { Link } from "react-router-dom";
import "./style.scss";
import InputBox from "../../components/Form/InputBox";
import { Button } from "@adobe/react-spectrum";
const Register = () => {
  return (
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
          <Button onClick={()=>{}} variant="accent">
            Sign Up
          </Button>
          <h6 className="login-or-divider">OR</h6>
        </div>
      </div>
  );
};

export default Register;
