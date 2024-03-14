import "./style.scss";
import { useState } from "react";
//spectrum
import {
  AlertDialog,
  Button,
  DialogTrigger,
  Heading,
  Item,
  TabList,
  TabPanels,
  Tabs,
  Text,
  Well,
} from "@adobe/react-spectrum";
import { ToastQueue } from "@react-spectrum/toast";
// api
import axios from "axios";
//redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCurrentWorkspace } from "../../state/reducers/workspaceSlice.js";
// comp
import Header from "../../components/Header/index.jsx";
import InputBox from "../../components/Form/InputBox/index.jsx";

const Settings = () => {
  const [name, setName] = useState("Student Guard");
  const [desc, setDesc] = useState("Lorem ipsum dolor sit amet.");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const [inviteEmail, setInviteEmail] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);

  const { currentWorkspace: workspace } = useSelector(
    (state) => state.workspace
  );
  const { _id, name: fromName } = useSelector((state) => state.auth.user);

  useEffect(() => {
    setName(workspace.name);
    setDesc(workspace.desc);
    setSelectedLanguage(workspace.language);
  }, []);

  const dispatch = useDispatch();
  const updateProjectSettings = async () => {
    const updateData = {
      name,
      desc,
      language: selectedLanguage,
    };
    try {
      setIsUpdating(true);
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/workspace/${workspace._id}`,
        updateData
      );
      const { status, data } = response.data;
      if (status === "SUCESS") {
        dispatch(setCurrentWorkspace(data));
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  };
  const sendInvitation = async () => {
    const bodyData = {
      workspaceId: workspace._id,
      fromId: _id,
      email: inviteEmail,
      fromName,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/invitation/send`,
        bodyData
      );
      const { status } = response.data;
      if (status === "SUCESS")
        ToastQueue.positive("Toast is done!", { timeout: 3000 });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="settings-container">
      <Header leftItem={<Heading level={3}>Settings</Heading>} />
      <div className="tabs-section">
        <Tabs aria-label="History of Ancient Rome">
          <TabList>
            <Item key="settings">Project</Item>
            <Item key="profile">General</Item>
          </TabList>
          <TabPanels
            marginTop={20}
            UNSAFE_style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Item key="settings">
              <div className="general-form">
                <Heading alignSelf="flex-start">Project Settings</Heading>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi odio, ullam perspiciatis et atque at officiis nam vero
                  sed ipsam.
                </p>
                <Heading alignSelf="flex-start">Basic details</Heading>
                <InputBox isFull value={name} setValue={setName} label="Name" />
                <InputBox
                  isFull
                  value={desc}
                  setValue={setDesc}
                  label="Description"
                />
                <InputBox
                  isFull
                  value={selectedLanguage}
                  setValue={setSelectedLanguage}
                  label="Language"
                />
                <div className="general-add-btn">
                  <Button
                    isPending={isUpdating}
                    onPress={updateProjectSettings}
                    variant="accent"
                  >
                    Update
                  </Button>
                </div>

                <Heading alignSelf="flex-start">Collaborators</Heading>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi odio,
                </p>
                <div className="general-add-btn">
                  <DialogTrigger>
                    <Button variant="accent">Add Collaborator</Button>
                    <AlertDialog
                      variant="confirmation"
                      title="Invite Collaborator"
                      primaryActionLabel="Invite"
                      cancelLabel="Cancel"
                      onPrimaryAction={sendInvitation}
                    >
                      <InputBox
                        label="Invite"
                        placeholder="Invite by email..."
                        value={inviteEmail}
                        setValue={setInviteEmail}
                      />
                    </AlertDialog>
                  </DialogTrigger>
                </div>
                <Well flex={1}>
                  <Text>rannaabdulrasheed@gmail.com</Text>
                </Well>
                <Well flex={1}>
                  <Text>rannaabdulrasheed@gmail.com</Text>
                </Well>
              </div>
            </Item>
            <Item key="connect">
              <Button variant="accent">Connect</Button>
            </Item>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
