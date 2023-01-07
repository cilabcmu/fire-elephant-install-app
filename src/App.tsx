import { createContext, useContext, useState } from "react";
import Drawer from "./components/drawer";
import Form from "./components/form";
import Menu from "./components/menu/menu";
import Status from "./components/status";
import { useAutoGps } from "./hooks/useAutoGPS";
import { useDrawer } from "./hooks/useDrawer";
import { useStatus } from "./hooks/useStatus";
import { STATUS, StatusContextType, SYSTEM_MODE_TYPE } from "./public/type";

const StatusContext = createContext<StatusContextType | null>(null);
const useStatusContext = () => useContext(StatusContext);

function App() {
  const [isOpenDrawer, setOpenDrawer] = useDrawer();
  const [status, setStatus] = useStatus(STATUS.waitID);
  const [systemMode, setSystemMode] = useState<SYSTEM_MODE_TYPE>("check");
  const [isAutoGPS, setAutoGPS] = useAutoGps();

  return (
    <StatusContext.Provider value={{ status, setStatus, isOpenDrawer, setOpenDrawer, isAutoGPS, setAutoGPS, systemMode, setSystemMode }}>
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
