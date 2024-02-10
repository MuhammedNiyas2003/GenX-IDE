import { NavLink } from "react-router-dom";
import "./style.scss";
import {
  docIcon,
  drawIcon,
  apiIcon,
  settingsIcon,
  aiIcon,
  generatorIcon,
} from "../../../contants/icons";

const sidebarItem = [
  { id: "01", name: "Editor", path: "project/123", icon: docIcon },
  { id: "02", name: "Draw", path: "drawer", icon: drawIcon },
  { id: "03", name: "API", path: "api-testing", icon: apiIcon },
  { id: "04", name: "Convertor", path: "code-converter", icon: aiIcon },
  { id: "05", name: "Generator", path: "code-generator", icon: generatorIcon },
  { id: "06", name: "Settings", path: "settings", icon: settingsIcon },
];
const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      {sidebarItem.map((item) => (
        <NavLink
          to={item.path}
          className={({ isActive }) => (isActive ? "active" : "")}
          key={item.id}
        >
          <div className="sidebar-item">
            <img className="sidebar-icon" src={item.icon} alt="" />
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
