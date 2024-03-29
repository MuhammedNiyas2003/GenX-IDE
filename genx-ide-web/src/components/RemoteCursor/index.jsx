import { useCallback, useEffect, useState } from "react";
import socket from "../../utils/socket/socket";
import { useSelector } from "react-redux";

const RemoteCursor = () => {
  const { loggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { currentWorkspace } = useSelector((state) => state.workspace);

  // const [mouseX, setMouseX] = useState(0);
  // const [mouseY, setMouseY] = useState(0);

  const [remoteCursors, setRemoteCursors] = useState([]);

  const mouseMoveHandler = (e) => {
    // setMouseX(e.clientX);
    // setMouseY(e.clientY);
    socket.emit("mouse-move", {
      mouseX: e.clientX,
      mouseY: e.clientY,
      userId: user?._id,
      userName: user.name,
      roomId: currentWorkspace?._id,
    });
  };

  const userMouseHandler = ({ mouseX, mouseY, userId, userName }) => {
    setRemoteCursors((prevCursors) => {
      const filteredCursors = prevCursors.filter(
        (cursor) => cursor.userId !== userId
      );
      return [
        ...filteredCursors,
        {
          userId,
          mouseX,
          mouseY,
          userName,
        },
      ];
    });
  };

  useEffect(() => {
    socket.on("user-mouse", userMouseHandler);
    return () => {
      socket.off("user-mouse", userMouseHandler);
    };
  }, [userMouseHandler]);

  useEffect(() => {
    if (!loggedIn) return;
    window.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [mouseMoveHandler]);

  return (
    <>
      {/* <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "red",
          position: "absolute",
          left: mouseX,
          top: mouseY,
          zIndex: 99,
        }}
      ></div> */}
      {remoteCursors.map(({ userId, mouseX, mouseY, userName }) => (
        <div
          key={userId}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "gray",
            position: "absolute",
            left: mouseX,
            top: mouseY,
            zIndex: 99,
          }}
        >
          <p style={{ fontSize: "12px" }}>{userName}</p>
        </div>
      ))}
    </>
  );
};

export default RemoteCursor;
