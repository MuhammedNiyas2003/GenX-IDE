import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Workspace/Sidebar";
import BottomBar from "../components/Workspace/BottomBar";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../state/reducers/spotifySlice.js";

const AuthenticatedLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch(setAccessToken({token}))
      }
    }
  }, []);

  return (
    <div style={{ display: "flex", backgroundColor: "red", width: "100vw" }}>
      <Sidebar />
      <Outlet />
      <BottomBar />
    </div>
  );
};

export default AuthenticatedLayout;
