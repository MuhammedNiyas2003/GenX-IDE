import "./style.scss";
import { navlinks } from "../../contants/data";
import { NavLink } from "react-router-dom";

const navStyle = {
  textDecoration: "none",
  fontWeight: 500,
  color: "grey",
};

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <div className="navbar-logo">
          <h3>Genx</h3>
        </div>
        <div className="navbar-links">
          {navlinks.map(({ route, id, name }) => (
            <NavLink
              style={{ ...navStyle, marginRight: "20px" }}
              className={({ isActive }) =>
                isActive ? "isActive navlink" : "navlink"
              }
              to={route}
              key={id}
            >
              {name}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="navbar-auth">
        <NavLink
          style={navStyle}
          to="/login"
          className={({ isActive }) =>
            isActive ? "isActive navlink" : "navlink"
          }
        >
          Sign In
        </NavLink>
        <NavLink
          style={{ ...navStyle, marginLeft: "20px" }}
          to="/"
          className={({ isActive }) =>
            isActive ? "isActive navlink" : "navlink"
          }
        >
          Sign Up
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
