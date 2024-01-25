import { useDispatch } from "react-redux";
import Button from "../../Button";
import "./style.scss";
import { setLogout } from "../../../state/reducers/authSlice";

const BottomBar = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(setLogout());
  };
  return (
    <div className="bottombar-container">
      <div className="bottombar-user">
        <Button onClick={logoutHandler} text="Logout" />
      </div>
      <div className="bottombar-music"></div>
      <div className="bottombar-details"></div>
    </div>
  );
};

export default BottomBar;
