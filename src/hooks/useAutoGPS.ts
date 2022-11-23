import { useEffect, useState } from "react";

const getAutoGPS: () => boolean = () => {
  const autoGPS: string | null = localStorage.getItem("isAutoGPS");

  return autoGPS ? autoGPS.toLowerCase() === "true" : false;
};

export const useAutoGps = () => {
  const autoGPS: boolean = getAutoGPS()

  const [isAutoGPS, setAutoGPS] = useState<boolean>(autoGPS);

  const onChangeSetAutoGPS = () => {
    localStorage.setItem("isAutoGPS", (!isAutoGPS).toString());
    setAutoGPS(!isAutoGPS);
  };

  return [isAutoGPS, onChangeSetAutoGPS] as const;
};
