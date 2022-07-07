const enum STATUS {
  waitID = "waitID",
  loading = "loading",
  found = "found",
  notFound = "notFound",
}

export { STATUS };

export interface StatusContextType {
  status: STATUS | string;
  setStatus: (value: STATUS) => void;
  isOpenDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
}
