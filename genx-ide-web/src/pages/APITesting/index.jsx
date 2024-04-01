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
  Heading,
} from "@adobe/react-spectrum";
import Header from "../../components/Header/index.jsx";
import { Editor } from "@monaco-editor/react";
import KeyValue from "../../components/KeyValue/index.jsx";

const APITesting = () => {
  const [url, setUrl] = useState("");
  const reqList = [
    {
      id: "01",
      req: "GET",
      value: "GET",
    },
    {
      id: "02",
      req: "POST",
      value: "POST",
    },
    {
      id: "03",
      req: "PUT",
      value: "PUT",
    },
    {
      id: "04",
      req: "DELETE",
    },
  ];
  return (
    <div className="api-container">
      <Header leftItem={<Heading level={3}>Test your API</Heading>} />

      <InputBox
        placeholder="Enter URL or paste text"
        type="text"
        value={url}
        setUrl={setUrl}
        RightItem={() => <SelectBox options={reqList} />}
        LeftItem={() => (
          <Button variant="cta" marginEnd={10}>
            Send
          </Button>
        )}
      />
      <div className="api-card">
        <Tabs aria-label="History of Ancient Rome">
          <TabList>
            <Item key="params">Query params</Item>
            <Item key="Headers">Headers</Item>
            <Item key="Body">Body</Item>
          </TabList>
          <TabPanels
            marginTop={20}
            UNSAFE_style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Item key="params">
              <div className="params-body">
                <KeyValue />
                <KeyValue />
              </div>
            </Item>
            <Item key="Headers">
              <div className="params-body">
                <KeyValue />
              </div>
            </Item>
            <Item key="Body">
              <Editor
                height="20vh"
                width="100%"
                defaultLanguage="javascript"
                // value={response}
                theme="vs-dark"
                options={{
                  mouseWheelScrollSensitivity: 0.5,
                }}
              />
            </Item>
          </TabPanels>
        </Tabs>
      </div>
      <div className="api-response-container">
        <Header leftItem={<Heading level={3}>Response</Heading>} />
        <p>Status: 200 Time: 2008 Size: 183 B</p>
        <div className="api-response-card">
          <Tabs aria-label="History of Ancient Rome">
            <TabList>
              <Item key="response-body">Response body</Item>
              <Item key="response-headers">Response Headers</Item>
            </TabList>
            <TabPanels
              marginTop={10}
              UNSAFE_style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Item key="response-body">
                <Editor
                  height="20vh"
                  width="100%"
                  defaultLanguage="javascript"
                  // value={response}
                  theme="vs-dark"
                  options={{
                    mouseWheelScrollSensitivity: 0.5,
                  }}
                />
              </Item>
              <Item key="reponse-header">
                <h1>Header</h1>
              </Item>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default APITesting;
