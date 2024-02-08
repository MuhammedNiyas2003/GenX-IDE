import "./style.scss";
//spectrum
import { Breadcrumbs, Item } from "@adobe/react-spectrum";
//comp
import InputBox from "../../Form/InputBox";
import { searchIcon } from "../../../contants/icons";
const Header = () => {
  return (
    <div className="header-container">
      <Breadcrumbs>
        <Item key="home">Home</Item>
        <Item key="trendy">Trendy</Item>
        <Item key="march 2020 assets">March 2020 Assets</Item>
      </Breadcrumbs>
      <div className="header-search-container">
        <InputBox placeholder="Search" type="text" LeftIcon={searchIcon} />
      </div>
    </div>
  );
};

export default Header;
