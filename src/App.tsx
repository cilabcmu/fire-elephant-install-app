import { useState } from "react";
// import "./App.css";
import Form from "./components/form";
import Menu from "./components/menu";
import Status from "./components/status";

function App() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen ">
      <Menu/>
      <Status />
      <Form />
    </div>
  );
}

export default App;
