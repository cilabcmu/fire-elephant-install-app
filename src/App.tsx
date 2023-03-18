import { createContext, useContext, useState } from "react";
import Form from "./components/form/form";
import Menu from "./components/menu/menu";
import Status from "./components/status";
import { useAutoGps } from "./hooks/useAutoGPS";
import { useStatus } from "./hooks/useStatus";
import { STATUS, StatusContextType, SYSTEM_MODE_TYPE } from "./public/type";

const StatusContext = createContext<StatusContextType | null>(null);
const useStatusContext = () => useContext(StatusContext);

function App() {
  const [status, setStatus] = useStatus(STATUS.waitID);
  const [systemMode, setSystemMode] = useState<SYSTEM_MODE_TYPE>("check");
  const [isAutoGPS, setAutoGPS] = useAutoGps();

  return (
    <StatusContext.Provider value={{ status, setStatus, isAutoGPS, setAutoGPS, systemMode, setSystemMode }}>
      <div className="font-prompt flex flex-col justify-top items-center w-full ">
        <Menu />
      </div>
      <div className="font-prompt flex flex-col justify-top items-center w-full h-screen ">
        <Status />
        <Form />
      </div>
    </StatusContext.Provider>
  );
}

export { useStatusContext };
export default App;
