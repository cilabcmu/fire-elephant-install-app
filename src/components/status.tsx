import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faMicrochip, faLocationDot, faXmark, faCircleExclamation, faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { STATUS, StatusContextType, SYSTEM_MODE_TYPE } from "../public/type";
import { FC } from "react";
import { useStatusContext } from "../App";

interface StatusProps {}

const statusIcon = (status: string, systemMode: SYSTEM_MODE_TYPE) => {
  const boxStyle = "flex justify-center items-center box-content h-32 w-32 p-4  border border-8 rounded-3xl";
  const textStyle = "flex justify-center items-center mt-5 text-2xl font-medium`";
  const isRecordMode: boolean = systemMode === "record";
  switch (status) {
    case STATUS.loading:
      return (
        <>
          <div className={`${boxStyle} border-blue-500`}>
            <FontAwesomeIcon className="animate-spin h-24 text-blue-500" icon={faCircleNotch} />
          </div>
          <div className={`${textStyle}`}>กำลังตรวจสอบ...</div>
        </>
      );
    case STATUS.waitID:
      return (
        <>
          <div className={`${boxStyle} border-blue-500`}>
            <FontAwesomeIcon className="h-24 text-blue-500 transition-colors duration-200 ease-in" icon={isRecordMode ? faMicrochip : faFingerprint} />
          </div>
          <div className={`${textStyle}`}>กรุณากรอกไอดีอุปกรณ์</div>
        </>
      );
    case STATUS.found:
      return (
        <>
          <div className={`${boxStyle} border-green-500`}>
            <FontAwesomeIcon className="h-24 text-green-500" icon={faLocationDot} />
          </div>
          <div className={`${textStyle}`}>ติดตั้งสำเร็จ</div>
        </>
      );

    case STATUS.notFound:
      return (
        <>
          <div className={`${boxStyle} border-orange-500`}>
            <FontAwesomeIcon className="h-24 text-orange-500 " icon={faCircleExclamation} />
          </div>
          <div className={`${textStyle}`}>ติดตั้งไม่สำเร็จ</div>
        </>
      );
    case STATUS.noDevice:
    default:
      return (
        <>
          <div className={`${boxStyle} border-red-500`}>
            <FontAwesomeIcon className="h-24 text-red-500" icon={faXmark} />
          </div>
          <div className={`${textStyle}`}>ไม่พบอุปกรณ์ในระบบ</div>
        </>
      );
  }
};

const Status: FC<StatusProps> = () => {
  const { status, systemMode } = useStatusContext() as StatusContextType;

  return <div className="flex flex-col justify-center items-center w-full p-5 ">{statusIcon(status, systemMode)}</div>;
};

export default Status;
