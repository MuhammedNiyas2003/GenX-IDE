import "./style.scss";
import { useState } from "react";
import Header from "../../components/Header/index.jsx";
import {
  ActionButton,
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
import InputBox from "../../components/Form/InputBox/index.jsx";

const Settings = () => {
  const [name, setName] = useState("Student Guard");
  const [des, setDec] = useState("Lorem ipsum dolor sit amet.");

  const reqList = [
    {
      id: "01",
      req: "GET",
      value: "GET",
      color: "green",
    },
    {
      id: "02",
      req: "POST",
      value: "POST",
      color: "red",
    },
    {
      id: "03",
      req: "PUT",
      value: "PUT",
      color: "yellow",
    },
    {
      id: "04",
      req: "DELETE",
      color: "blue",
    },
  ];

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
                  value={des}
                  setValue={setDec}
                  label="Description"
                />
                <InputBox isFull value={name} setValue={setName} label="Name" />
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
                      onPrimaryAction={() => {}}
                    >
                      <InputBox label="Invite" placeholder="Invite by email..." />
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
