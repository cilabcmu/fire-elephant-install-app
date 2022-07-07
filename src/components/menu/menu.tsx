import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useStatusContext } from "../../App";
import { useDrawer } from "../../hooks/useDrawer";
import { StatusContextType } from "../../public/type";
import Drawer from "../drawer";

const Menu = () => {
  const { isOpenDrawer, setOpenDrawer } = useStatusContext() as StatusContextType;
  return (
    <div className="flex flex-col justify-center items-end p-5 w-full">
      <div className="flex justify-center p-2 bg-gray-100 rounded-lg" onClick={() => setOpenDrawer(true)}>
        <FontAwesomeIcon className="h-5 w-5 text-gray-600" icon={faBars} />
      </div>
    </div>
  );
};

export default Menu;
