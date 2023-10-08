import { NavLink } from "react-router-dom";
import "./style.css";

const sidebarItem = [
  { id: "01", name: "Editor", path: "project/123" },
  { id: "02", name: "Draw", path: "drawer" },
  { id: "03", name: "API", path: "api-testing" },
];
const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      {sidebarItem.map((item) => (
        <NavLink to={item.path}>
          <p>{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
