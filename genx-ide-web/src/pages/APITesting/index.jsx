import { useState } from "react";
import "./style.scss";
import axios from "axios";
import prettyBytes from "pretty-bytes";
//comp
import InputBox from "../../components/Form/InputBox";
import SelectBox from "../../components/Form/SelectBox";
import KeyValue from "../../components/KeyValue/index.jsx";
import Header from "../../components/Header/index.jsx";

import {
  Item,
  TabList,
  TabPanels,
  Tabs,
  Button,
  Heading,
} from "@adobe/react-spectrum";
//monaco
import { Editor } from "@monaco-editor/react";

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
const APITesting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("https://jsonplaceholder.org/posts");
  const [selectedReq, setSelectedReq] = useState("GET");
  // response state
  const [status, setStatus] = useState(0);
  const [time, setTime] = useState(0);
  const [size, setSize] = useState(0);
  const [response, setResponse] = useState(null);
  const [responseHeaders, setResponseHeaders] = useState({});
  //params state
  const [body, setBody] = useState(null);
  const [queryParams, setQueryParams] = useState([
    {
      key: "",
      value: "",
    },
  ]);
  const [headerParams, setHeaderParams] = useState([
    {
      key: "",
      value: "",
    },
  ]);
  //  key value handlers
  const handleAddParam = (type) => {
    switch (type) {
      case "query":
        setQueryParams([...queryParams, { key: "", value: "" }]);
        break;
      case "header":
        setHeaderParams([...headerParams, { key: "", value: "" }]);
        break;
    }
  };

  const handleRemoveParam = (index, type) => {
    switch (type) {
      case "query":
        setQueryParams(queryParams.filter((_, i) => i !== index));
        break;
      case "header":
        setHeaderParams(headerParams.filter((_, i) => i !== index));
        break;
    }
  };

  const handleParamChange = (index, key, value, type) => {
    switch (type) {
      case "query":
        setQueryParams((prevParams) =>
          prevParams.map((param, i) => {
            if (i === index) {
              return { ...param, [key]: value };
            }
            return param;
          })
        );
        break;
      case "header":
        setHeaderParams((prevParams) =>
          prevParams.map((param, i) => {
            if (i === index) {
              return { ...param, [key]: value };
            }
            return param;
          })
        );
        break;
    }
  };

  // api call
  const handleSendRequest = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        url,
        method: selectedReq,
        params: queryParams,
        headers: headerParams,
        body: JSON.parse(body),
        validateStatus: () => true,
      });
      if (response) {
        console.log("response",response)
        setStatus(response.status);
        setResponse(response.data);
        setResponseHeaders(response.headers);
        // setTime(response.customData.time);
        setSize(
          prettyBytes(
            JSON.stringify(response.data).length +
              JSON.stringify(response.headers).length
          )
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="api-container">
      <Header leftItem={<Heading level={3}>Test your API</Heading>} />

      <InputBox
        placeholder="Enter URL or paste text"
        type="text"
        value={url}
        setValue={setUrl}
        RightItem={() => (
          <SelectBox
            currentOption={selectedReq}
            setCurrentOption={setSelectedReq}
            options={reqList}
          />
        )}
        LeftItem={() => (
          <Button
            isPending={isLoading}
            variant="cta"
            marginEnd={10}
            onPress={handleSendRequest}
          >
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
                {queryParams?.map((item, index) => (
                  <KeyValue
                    type="query"
                    key={index}
                    index={index}
                    item={item}
                    onChange={handleParamChange}
                    onRemove={() => handleRemoveParam(index, "query")}
                  />
                ))}
                <Button onPress={() => handleAddParam("query")}>Add</Button>
              </div>
            </Item>
            <Item key="Headers">
              <div className="params-body">
                {headerParams?.map((item, index) => (
                  <KeyValue
                    type="header"
                    key={index}
                    index={index}
                    item={item}
                    onChange={handleParamChange}
                    onRemove={() => handleRemoveParam(index, "header")}
                  />
                ))}
                <Button onPress={() => handleAddParam("header")}>Add</Button>
              </div>
            </Item>
            <Item key="Body">
              <Editor
                height="20vh"
                width="100%"
                defaultLanguage="json"
                value={body}
                onChange={(value) => setBody(value)}
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
        <p>
          Status: {status} Time: {time}m Size: {size}
        </p>
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
                  defaultLanguage="json"
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
