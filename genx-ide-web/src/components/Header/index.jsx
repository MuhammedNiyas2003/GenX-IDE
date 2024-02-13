import "./style.scss";
//spectrum
import { Breadcrumbs, Item } from "@adobe/react-spectrum";
//comp
import InputBox from "../Form/InputBox";
//icons
import { searchIcon } from "../../contants/icons";
const Header = ({ leftItem, rightItem }) => {
  return (
    <div className="header-container">
      <div className="header-left-container">{leftItem}</div>
      <div className="header-right-container">{rightItem}</div>
    </div>
  );
};

export default Header;
