import { Link } from "react-router-dom";
import  './style.css'
const Register = () => {
  return (
    <div>
      Register
      <Link to="/login">
        <button>Login</button>
      </Link>
      <div className="register-container">
        <div className="register-card">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" className="register-input"/>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" className="register-input"/>
          <label>Password</label>
          <input type="password" placeholder="Password" className="register-input"/>
          <button className="register-btn">Sign Up</button>
         
        </div>
    </div>
    </div>
  );    
};

export default Register;
