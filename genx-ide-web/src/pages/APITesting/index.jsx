import { useState } from "react";
import "./style.scss";
//comp
import InputBox from "../../components/Form/InputBox";
import SelectBox from "../../components/Form/SelectBox";
import {
  Item,
  TabList,
  TabPanels,
  Tabs,
  Button,
  ActionButton,
} from "@adobe/react-spectrum";

const APITesting = () => {
  const [url, setUrl] = useState("");
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
    <div className="api-container">
      <InputBox
        label="test"
        placeholder="test"
        type="text"
        value={url}
        setUrl={setUrl}
        RightItem={() => <SelectBox data={reqList} />}
      />
      <div className="api-card">
        <Tabs aria-label="History of Ancient Rome">
          <TabList>
            <Item key="prams">Prams</Item>
            <Item key="authorisation">Authorisation</Item>
            <Item key="Headers">Headers</Item>
            <Item key="Body">Body</Item>
            <Item key="Settings">Settings</Item>
            <Item key="Test">Test</Item>
          </TabList>
          <TabPanels
            marginTop={120}
            UNSAFE_style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Item key="prams">
              <h1>PRAMS</h1>
            </Item>
            <Item key="authorisation">
              <h1>Authorisation</h1>
            </Item>
            <Item key="Headers">
              <h1 >Header</h1>
            </Item>
            <Item key="Body">
              <h1>Body</h1>
            </Item>
            <Item key="Settings">
              <h1>Settings</h1>
            </Item>
            <Item key="Test">
              <h1>Test</h1>
            </Item>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default APITesting;
