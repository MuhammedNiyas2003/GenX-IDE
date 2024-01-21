import { Outlet } from "react-router-dom";
import Sidebar from "../components/Workspace/Sidebar";
import BottomBar from "../components/Workspace/BottomBar";
import RightBar from "../components/Workspace/RightBar";

const AuthenticatedLayout = () => {
  return (
    <div style={{ display: "flex", backgroundColor: "red", width: "100vw" }}>
      <Sidebar />
      <Outlet />
      <RightBar />
      <BottomBar />
    </div>
  );
};

export default AuthenticatedLayout;
