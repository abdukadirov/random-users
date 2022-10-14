import React from "react";
import Header from "./components/Header";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header/>
        <div className="main">
          <LeftSide/>
          <RightSide/>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
