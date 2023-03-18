const enum STATUS {
  waitID = "waitID",
  loading = "loading",
  found = "found",
  notFound = "notFound",
  noDevice = "noDevice",
}

export type SYSTEM_MODE_TYPE = "record" | "check";

export { STATUS };

export interface StatusContextType {
  status: STATUS | string;
  setStatus: (value: STATUS) => void;
  isAutoGPS: boolean;
  setAutoGPS: () => void;
  systemMode: SYSTEM_MODE_TYPE;
  setSystemMode: (value: SYSTEM_MODE_TYPE) => void;
}

export type UpdateLocationCheckSDType = {
  latlngMessage: string;
  latlngStatus: boolean;
  status: boolean;
  statusMessage: string;
};
