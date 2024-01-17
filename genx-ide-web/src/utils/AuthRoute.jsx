import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { loggedIn } = useSelector((state) => state.auth);

  return loggedIn ? <Navigate to="/workspace" /> : children;
};

export default AuthRoute;
