import { Outlet } from "react-router-dom";
import Sidebar from "../components/Workspace/Sidebar";
import BottomBar from "../components/Workspace/BottomBar";

const AuthenticatedLayout = () => {
  return (
    <div style={{ display: "flex", backgroundColor: "red", width: "100vw" }}>
      <Sidebar />
      <Outlet />
      <BottomBar />
    </div>
  );
};

export default AuthenticatedLayout;
