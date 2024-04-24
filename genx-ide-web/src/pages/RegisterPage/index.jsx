import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import InputBox from "../../components/Form/InputBox";
import { Button } from "@adobe/react-spectrum";

const Register = ({}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(email, username, password);
  }, [email, username, password]);

  const userRegisterHandler = async () => {
    const formData = {
      email,
      username,
      password,
    };
    console.log(formData);
    navigate("/set-profile", { state: formData });
  };

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
          value={email}
          setValue={setEmail}
        />
        <InputBox
          label="Username"
          placeholder="Enter your username"
          type="text"
          value={username}
          setValue={setUsername}
        />
        <InputBox
          label="Password"
          placeholder="password"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <Button onPress={userRegisterHandler} variant="accent">
          Sign Up
        </Button>
        <h6 className="login-or-divider">OR</h6>
      </div>
    </div>
  );
};

export default Register;
