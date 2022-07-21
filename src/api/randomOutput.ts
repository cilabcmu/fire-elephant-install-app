import { STATUS } from "../public/type";

export const randomOutput = () => {
  const number: number = Math.round(Math.random() * 10) / 10;
  if(number < 0.4){
    return STATUS.found
  }else if(number >= 0.4 && number < 0.8){
    return STATUS.notFound
  }
  return STATUS.noDevice;
};
