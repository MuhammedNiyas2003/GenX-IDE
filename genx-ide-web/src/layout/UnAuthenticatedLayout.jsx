// router
import { Outlet } from "react-router-dom";
// comp
import Navbar from "../components/Navbar";

const UnAuthenticatedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default UnAuthenticatedLayout;
