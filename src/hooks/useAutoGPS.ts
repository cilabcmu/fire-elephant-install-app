import { useEffect, useState } from "react";

export const useAutoGps = (initValue: boolean = true) => {

  const autoGPS : string | null = localStorage.getItem("isAutoGPS");

  const [isAutoGPS, setAutoGPS] = useState<boolean>(initValue);

  const onChangeSetAutoGPS = () => {
    localStorage.setItem("isAutoGPS", (!isAutoGPS).toString());
    setAutoGPS(!isAutoGPS)
  };

  useEffect(() => {
    if (autoGPS) {
      setAutoGPS(autoGPS.toLowerCase()  === "true");
    }
  }, [isAutoGPS]);

  return [isAutoGPS, onChangeSetAutoGPS] as const;
};
