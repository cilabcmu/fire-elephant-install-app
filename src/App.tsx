import { useState } from "react";
// import "./App.css";
import Form from "./components/form";
import Menu from "./components/menu";
import Status from "./components/status";

function App() {
  const status: string = "";
  return (
    <div className="font-prompt flex flex-col justify-center items-center w-full h-screen ">
      <Menu />
      <Status status={status} />
      <Form status={status} />
    </div>
  );
}

export default App;
