import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import socket from "../../utils/socket/socket.js";
import InputBox from "../../components/Form/InputBox";
import { Item, TabList, TabPanels, Tabs, Button } from "@adobe/react-spectrum";

const CreateProject = () => {
  const { email } = useSelector((state) => state.auth.user);
  const [room, setRoom] = useState("");
  const [joinRoom, setJoinRoom] = useState("");

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
  const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    setRoom(code);
  };

  //socket
  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  //gen rooom code
  useEffect(() => {
    generateCode();
  }, []);

  return (
    <div className="createproject-container">
      <div className="createproject-card">
        <Tabs aria-label="History of Ancient Rome">
          <TabList>
            <Item key="new">Start a New Workspace</Item>
            <Item key="connect">Connect to Workspace</Item>
          </TabList>
          <TabPanels
            marginTop={20}
            UNSAFE_style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Item key="new">
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
                value={room}
                placeholder="WORKSPACE ID"
                type="text"
              />
              <div className="generate-btn-container">
                <Button  marginY={10} variant="overBackground" onPress={generateCode}>
                  Refresh Code
                </Button>
              </div>
              <Button onClick={handleSubmitForm} variant="accent">
                Create workspace
              </Button>
            </Item>
            <Item key="connect">
              <InputBox
                label="Your Email"
                placeholder="Enter your email"
                type="email"
                value={email}
              />
              <InputBox
                label="Enter WORKSPACE ID"
                setValue={setJoinRoom}
                value={joinRoom}
                placeholder="WORKSPACE ID"
                type="text"
              />
              <Button marginTop={5} onClick={handleSubmitForm} variant="accent">
                Connect
              </Button>
            </Item>
          </TabPanels>
        </Tabs>
      </div>
      <div className="createproject-recent">
        <h3>Recent</h3>
        <p>
          <span>students guard</span> - jan 23 2003
        </p>
        <p>
          <span>students guard</span> - jan 23 2003
        </p>
        <p>
          <span>students guard</span> - jan 23 2003
        </p>
        <p>
          <span>students guard</span> - jan 23 2003
        </p>
      </div>
    </div>
  );
};

export default CreateProject;
