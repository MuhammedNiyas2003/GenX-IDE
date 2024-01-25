// router
import { Outlet } from "react-router-dom";
// comp
import AuthHeader from "../components/AuthHeader";

const UnAuthenticatedLayout = () => {
  return (
    <>
      <AuthHeader />
      <Outlet />
    </>
  );
};

export default UnAuthenticatedLayout;
