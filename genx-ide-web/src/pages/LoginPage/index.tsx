import { Link } from "react-router-dom";
import './style.css'

const Login = () => {
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
          <label>Email</label>
          <input type="email" placeholder="Enter your email" className="login-input"/>
          <label>Password</label>
          <input type="password" placeholder="Password" className="login-input"/>
          <button className="login-btn">Sign In</button>
          <h6 className="login-or-divider">OR</h6>
         
        </div>
      </div>
    </div>
  );
};

export default Login;
