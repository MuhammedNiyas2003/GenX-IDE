import { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import "./style.scss";
//components
import InputBox from "../../components/Form/InputBox";
//api
import axios from "axios";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../state/reducers/authSlice.js";
import { Button } from "@adobe/react-spectrum";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  //email and password login
  const loginHandler = async () => {
    setIsLoading(true);
    try {
      const formData = {
        email,
        password,
      };
      console.log(formData);
      const loginResponse = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        formData
      );
      const { status, user, token } = loginResponse.data;
      if (status === "SUCCESS") {
        dispatch(setLogin({ user, token }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  //github + passport login
  const githubLoginHandler = async () => {
    try {
      // Redirect the user to the GitHub login page on the server
      window.location.href = `${
        import.meta.env.VITE_SERVER_URL
      }/api/auth/github`;
      // window.location.href = response.data.redirectUrl;
    } catch (error) {
      console.error("GitHub login failed:", error);
    }
  };

  return (
    <div>
      Login Page
      <Link to="/workspace">
        <button>workspace</button>
      </Link>
      <Link to="/explore">
        <button>explore</button>
      </Link>
      <div className="login-container">
        <div className="login-card">
          <InputBox
            label="Your Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            setValue={setEmail}
          />
          <InputBox
            label="Password"
            placeholder="password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <Button isPending={isLoading} onClick={loginHandler} variant="accent">
            Sign In
          </Button>
          <h6 className="login-or-divider">OR</h6>
          <Button onClick={githubLoginHandler} variant="accent">
            Github
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
