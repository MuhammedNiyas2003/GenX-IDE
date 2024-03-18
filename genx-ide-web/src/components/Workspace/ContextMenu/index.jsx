import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeContext } from "../../../state/reducers/contextMenuSlice";

const ContextMenu = () => {
  const { x, y, isVisible } = useSelector((state) => state.contextMenu);
  const dispatch = useDispatch();

  const handlerClose = () => {
    dispatch(closeContext());
  };
  useEffect(() => {
    window.addEventListener("mousedown", () => {
      window.addEventListener("click", handlerClose);
      return () => {
        window.removeEventListener("click", handlerClose);
      };
    });
  }, []);
  if (isVisible)
    return (
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "400px",
          backgroundColor: "grey",
          borderRadius: "5px",
          zIndex: 99,
          left: x,
          top: y,
        }}
      >
        helo
      </div>
    );
};
export default ContextMenu;
