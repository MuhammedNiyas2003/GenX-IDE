import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "../../utils/socket/socket.js";
import InputBox from "../../components/Form/InputBox";
// import Button from "../../components/Button";
import { Item, TabList, TabPanels, Tabs, Button } from "@adobe/react-spectrum";

const CreateProject = () => {
  const { email } = useSelector((state) => state.auth.user);
  const [room, setRoom] = useState("");

  const navigate = useNavigate();
  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/workspace/project/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="createproject-container">
      <div className="createproject-card">
        <Tabs aria-label="History of Ancient Rome">
          <TabList>
            <Item key="FoR">Start a New Workspace</Item>
            <Item key="MaR">Connect to Workspace</Item>
          </TabList>
          <TabPanels
            marginTop={20}
            UNSAFE_style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Item key="FoR">
              <InputBox
                label="Project name"
                placeholder="Enter project name..."
                type="text"
              />
              <InputBox
                label="Language"
                placeholder="eg: javascript, c++ ..."
                type="text"
              />
              <InputBox
                label="Your Email"
                placeholder="Enter your email"
                type="email"
                value={email}
              />
              <InputBox
                label="Enter WORKSPACE ID"
                setValue={setRoom}
                value={room}
                placeholder="WORKSPACE ID"
                type="text"
              />
              <Button onClick={handleSubmitForm} variant="accent">
                Create workspace
              </Button>
            </Item>
            <Item key="MaR">
              <InputBox
                label="Your Email"
                placeholder="Enter your email"
                type="email"
                value={email}
              />
              <InputBox
                label="Enter WORKSPACE ID"
                setValue={setRoom}
                value={room}
                placeholder="WORKSPACE ID"
                type="text"
              />
              <Button onClick={handleSubmitForm} variant="accent">
                Connect
              </Button>
            </Item>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateProject;
