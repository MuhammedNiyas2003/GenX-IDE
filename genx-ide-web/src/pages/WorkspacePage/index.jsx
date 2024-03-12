import "./style.scss";
import { useEffect, useState } from "react";
import Split from "react-split";

import RightBar from "../../components/Workspace/RightBar";
import Editor from "../../components/Workspace/Editor";
import Explorer from "../../components/Workspace/Explorer";
import { useSelector } from "react-redux";

const Workspace = () => {

  return (
    <>
      <Split gutterSize={1} className="main-split" sizes={[16, 80]}>
        <Explorer />
        <Editor />
      </Split>
      <RightBar />
    </>
  );
};

export default Workspace;
