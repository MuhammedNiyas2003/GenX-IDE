import { Button } from "@adobe/react-spectrum";
import "./style.scss";
import { useSelector } from "react-redux";

const TopBar = () => {
  const { name } = useSelector((state) => state.auth.user);
  return (
    <div className="topbar-container">
      <Button marginEnd={25} variant="secondary" style="fill">
        Publish
      </Button>
      <div className="topbar-userprofile">
        <div className="topbar-userprofile-image">
          <img
            src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
            alt="user-profile"
          />
        </div>
        <div className="topbar-userprofile-name">
          <p>
            Hey, <span>{name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
