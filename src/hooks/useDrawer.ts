import { useState } from "react";

export const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onChangeOpen = (value?: boolean) => (value ? setIsOpen(value) : setIsOpen(!isOpen));

  return [isOpen, onChangeOpen] as const;
};
