import { COLOR } from "../public/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faQuestion, faLocationDot, faXmark, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { STATUS, StatusContextType } from "../public/type";
import { FC } from "react";
import { useStatusContext } from "../App";

interface StatusProps {
  // status: string;
}

const statusIcon = (status: string) => {
  const boxStyle = "flex justify-center items-center box-content h-32 w-32 p-4  border border-8 rounded-3xl";
  const textStyle = "flex justify-center items-center mt-5 text-2xl font-medium`";
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
            <FontAwesomeIcon className="h-24 text-blue-500" icon={faQuestion} />
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
          <div className={`${textStyle}`}>พบอุปกรณ์</div>
        </>
      );

    case STATUS.notFound:
      return (
        <>
          <div className={`${boxStyle} border-orange-500`}>
            <FontAwesomeIcon className="h-24 text-orange-500" icon={faCircleExclamation} />
          </div>
          <div className={`${textStyle}`}>ไม่พบอุปกรณ์</div>
        </>
      );
    default:
      return (
        <>
          <div className={`${boxStyle} border-red-500`}>
            <FontAwesomeIcon className="h-24 text-red-500" icon={faXmark} />
          </div>
          <div className={`${textStyle}`}>ไม่พบอุปกรณ์ที่ค้นหา</div>
        </>
      );
  }
};

const Status: FC<StatusProps> = () => {
  const { status } = useStatusContext() as StatusContextType;

  return <div className="flex flex-col justify-center items-center w-full p-5">{statusIcon(status)}</div>;
};

export default Status;
