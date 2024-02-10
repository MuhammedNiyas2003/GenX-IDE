import "./style.scss";
import Header from "../../components/Header/index.jsx";
import { Button, Heading, Item, TabList, TabPanels, Tabs } from "@adobe/react-spectrum";

const Settings = () => {
  return (
    <div className="settings-container">
      <Header leftItem={<Heading level={3}>Settings</Heading>} />
      <div className="tabs-section">
        <Tabs
          aria-label="History of Ancient Rome"
          UNSAFE_style={
            {
              // backgroundColor:"#fff"
            }
          }
        >
          <TabList>
            <Item key="settings">General</Item>
            <Item key="profile">Profile</Item>
          </TabList>
          <TabPanels
            marginTop={20}
            UNSAFE_style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              // backgroundColor:"#fff"
            }}
          >
            <Item key="settings">
              <Button variant="accent">Create workspace</Button>
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
