import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      Register
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Register;
