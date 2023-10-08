import { Outlet } from "react-router-dom";
import Sidebar from "../components/Workspace/Sidebar";

const AuthenticatedLayout = () => {
  return (
    <div style={{ display: "flex", backgroundColor: "grey", width: "100vw" }}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AuthenticatedLayout;
