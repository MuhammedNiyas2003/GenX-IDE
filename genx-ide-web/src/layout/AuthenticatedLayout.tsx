import { Outlet } from "react-router-dom";

const AuthenticatedLayout = () => {
  return (
    <>
      <h2>AuthenticatedLayout</h2>
      <Outlet />
    </>
  );
};

export default AuthenticatedLayout;
