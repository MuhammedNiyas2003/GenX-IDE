import "./style.scss";
//spectrum
const Header = ({ leftItem, rightItem }) => {
  return (
    <div className="header-container">
      <div className="header-left-container">{leftItem}</div>
      <div className="header-right-container">{rightItem}</div>
    </div>
  );
};

export default Header;
