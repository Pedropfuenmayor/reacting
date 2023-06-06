import React from "react";
import "./App.css";

import { MasterDetail } from "./components/master-detail";

const App = () => {
  return (
    <MasterDetail>
      <MasterDetail.Item payload={{ content: "Hello Peers" }}>
        Intro
      </MasterDetail.Item>
      <MasterDetail.Item payload={{ content: "Welcome to Ampeers Energy" }}>
        Welcome
      </MasterDetail.Item>
      <MasterDetail.Detail>{(payload) => payload.content}</MasterDetail.Detail>
    </MasterDetail>
  );
};

export default App;
