import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useSelector((state) => state.auth);

  return !loggedIn ? <Navigate to="/login" /> : children;
};

export default ProtectedRoute;
