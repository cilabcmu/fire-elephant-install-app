import { createContext, useContext, useState } from "react";
import Form from "./components/form";
import Menu from "./components/menu";
import Status from "./components/status";
import { useStatus } from "./hooks/useStatus";
import { STATUS, StatusContextType } from "./public/type";

const StatusContext = createContext<StatusContextType | null>(null);
const useStatusContext = () => useContext(StatusContext);

function App() {
  const [status, setStatus] = useStatus(STATUS.waitID);
  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      <div className="font-prompt flex flex-col justify-top items-center w-full h-screen ">
        <Menu />
        <Status />
        <Form />
      </div>
    </StatusContext.Provider>
  );
}

export { useStatusContext };
export default App;
