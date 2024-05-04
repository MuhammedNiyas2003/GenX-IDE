import "./style.scss";
import { useNavigate, redirect } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import socket from "../../utils/socket/socket.js";
import InputBox from "../../components/Form/InputBox";
import { Item, TabList, TabPanels, Tabs, Button } from "@adobe/react-spectrum";
import {
  setCurrentWorkspace,
  setFileFolder,
} from "../../state/reducers/workspaceSlice.js";

const CreateProject = () => {
  const { email, _id } = useSelector((state) => state.auth.user);
  const { currentWorkspace } = useSelector((state) => state.workspace);

  const [projectName, setProjectName] = useState("");
  const [language, setLanguage] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");
  const [desc, setDesc] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  //create workspace
  const handleSubmitForm = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const workspaceData = {
        name: projectName,
        desc,
        language,
        admin: _id,
        collaborators: [_id],
      };
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/workspace/create-workspace`,
        workspaceData
      );
      const { data, status } = response.data;
      console.log(response);
      if (status === "SUCESS") {
        console.log(data);
        dispatch(setCurrentWorkspace(data));
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/api/file-folder/${data._id}`
          );
          dispatch(setFileFolder(response.data.data));
        } catch (error) {
          console.log(error);
        }
        socket.emit("room:join", { email, room: data._id });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //connect workspace

  const connectWorkspaceHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/workspace/${workspaceId}`
      );
      const { data, status } = response.data;

      if (status === "SUCESS") {
        console.log(data);
        dispatch(setCurrentWorkspace(data));
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/api/file-folder/${data._id}`
          );
          dispatch(setFileFolder(response.data.data));
        } catch (error) {
          console.log(error);
        }

        socket.emit("room:join", { email, room: data?._id });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/workspace/project/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    if (currentWorkspace !== null) {
      navigate(`/workspace/project/${currentWorkspace._id}`);
    }
  }, []);

  //socket
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
                value={projectName}
                setValue={setProjectName}
              />
              <InputBox
                label="Description"
                placeholder="Write about the project..."
                type="text"
                value={desc}
                setValue={setDesc}
              />
              <InputBox
                label="Language"
                placeholder="eg: javascript, c++ ..."
                type="text"
                value={language}
                setValue={setLanguage}
              />
              <Button
                isPending={isLoading}
                onClick={handleSubmitForm}
                variant="accent"
              >
                Create workspace
              </Button>
            </Item>
            <Item key="connect">
              <InputBox
                label="Enter WORKSPACE ID"
                setValue={setWorkspaceId}
                value={workspaceId}
                placeholder="WORKSPACE ID"
                type="text"
              />
              <Button
                isPending={isLoading}
                marginTop={5}
                onClick={connectWorkspaceHandler}
                variant="accent"
              >
                Connect
              </Button>
            </Item>
          </TabPanels>
        </Tabs>
      </div>
      <div className="createproject-recent">
        <h3>Recent</h3>
        <p>
          <span>65cb2da408688533bf46618b</span> - jan 23 2003
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
