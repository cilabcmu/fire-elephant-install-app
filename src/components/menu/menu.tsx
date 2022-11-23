import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useStatusContext } from "../../App";
import { useDrawer } from "../../hooks/useDrawer";
import { StatusContextType } from "../../public/type";
import Drawer from "../drawer";

const Menu = () => {
  const { setOpenDrawer, isAutoGPS, setAutoGPS } = useStatusContext() as StatusContextType;
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
    </div>
  );
};

export default Menu;
