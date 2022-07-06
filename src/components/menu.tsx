import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDrawer } from "../hooks/useDrawer";
import Drawer from "./drawer";

const Menu = () => {
  const [isOpen, onChangeOpen] = useDrawer();
  return (
    <div>
      <div className="flex flex-col justify-center items-end p-5 w-full">
        <div className="flex justify-center p-2 bg-gray-100 rounded-lg" onClick={() => onChangeOpen()}>
          <FontAwesomeIcon className="h-5 w-5 text-gray-600" icon={faBars} />
        </div>
      </div>
      <Drawer isOpen={isOpen} setIsOpen={onChangeOpen}></Drawer>
    </div>
  );
};

export default Menu;
