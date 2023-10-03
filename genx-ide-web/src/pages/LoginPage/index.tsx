import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      Login Page{" "}
      <Link to="/workspace">
        <button>workspace</button>
      </Link>
      <Link to="/explore">
        <button>explore</button>
      </Link>
    </div>
  );
};

export default Login;
