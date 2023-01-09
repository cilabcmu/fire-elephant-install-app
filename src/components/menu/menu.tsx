import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { useStatusContext } from "../../App";
import { useDrawer } from "../../hooks/useDrawer";
import { StatusContextType, SYSTEM_MODE_TYPE } from "../../public/type";
import Drawer from "../drawer";

interface ToggleBtnProps {
  systemMode: SYSTEM_MODE_TYPE;
  onChangeMode: (mode: SYSTEM_MODE_TYPE) => void;
}

const ToggleBtn: FC<ToggleBtnProps> = ({ systemMode, onChangeMode }) => {

  const isRecordMode: boolean = systemMode === "record";

  const isCheckingMode: boolean = !isRecordMode;

  const activeClass: string = `${isRecordMode ? 'bg-yellow-500' : 'bg-green-500'} rounded-full text-white`

  return (
    <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
      <button
        className={`inline-flex items-center transition-colors duration-200 ease-in focus:outline-none hover:text-white-400 focus:text-white-400 rounded-l-full px-4 py-2 ${
          isRecordMode ? activeClass : ""
        }`}
        id="recording"
        onClick={() => onChangeMode("record")}
      >
        <span>บันทึก</span>
      </button>
      <button
        className={`inline-flex items-center transition-colors duration-200 ease-in focus:outline-none hover:text-white-400 focus:text-white-400 rounded-r-full px-4 py-2 ${
          isCheckingMode ? activeClass : ""
        }`}
        id="checking"
        onClick={() => onChangeMode("check")}
      >
        <span>ตรวจสอบ</span>
      </button>
    </div>
  );
};

const Menu: FC = () => {
  const { setOpenDrawer, isAutoGPS, setAutoGPS, systemMode, setSystemMode } = useStatusContext() as StatusContextType;

  return (
    <div className="flex flex-row justify-between items-end p-5 w-full">
      <div className="flex justify-center p-2">
        <input
          id="checkbox"
          type="checkbox"
          checked={isAutoGPS}
          onChange={setAutoGPS}
          className="w-4 h-4 text-blue-500 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="checkbox" className="ml-2 text-sm">
          Auto GPS
        </label>
      </div>

      {/* <div className="flex justify-center p-2 bg-gray-100 rounded-lg" onClick={() => setOpenDrawer(true)}>
        <FontAwesomeIcon className="h-5 w-5 text-gray-600" icon={faBars} />
      </div> */}
      <div className="flex">
        <ToggleBtn systemMode={systemMode} onChangeMode={setSystemMode} />
      </div>
    </div>
  );
};

export default Menu;
