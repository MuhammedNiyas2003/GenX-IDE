import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import {
  docIcon,
  drawIcon,
  apiIcon,
  settingsIcon,
  aiIcon,
  generatorIcon,
} from "../../../contants/icons";

const Sidebar = () => {
  const { _id } =
    useSelector((state) => state.workspace?.currentWorkspace) || "123";
  const sidebarItem = [
    { id: "01", name: "Editor", path: `project/${_id}`, icon: docIcon },
    { id: "02", name: "Draw", path: "drawer", icon: drawIcon },
    { id: "03", name: "API", path: "api-testing", icon: apiIcon },
    {
      id: "04",
      name: "Convertor",
      path: "code-converter",
      icon: generatorIcon,
    },
    { id: "05", name: "Generator", path: "code-generator", icon: aiIcon },
    { id: "06", name: "Settings", path: "settings", icon: settingsIcon },
  ];
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
