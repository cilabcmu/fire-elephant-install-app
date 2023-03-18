import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface HelpTextProps {
  text?: string;
}

export enum HelpTextType {
  gpsFinding = "กำลังตรวจสอบ GPS",
  gpsFail = "ตรวจสอบ GPS ล้มเหลว",
  requiredField = "* กรุณากรอกให้ครบ",
  locationOutArea = "* ตำแหน่งอุปกรณ์เกินขอบเขต",
}

const HelpText: FC<HelpTextProps> = ({ text }) => {
  const isGpS: boolean = text === HelpTextType.gpsFinding;
  const color: string = isGpS ? "text-neutral-400" : "text-red-500";
  return (
    <div className={`flex flex-row text-sm ${color}`}>
      {isGpS && (
        <div className="pt-2 pr-1">
          <FontAwesomeIcon className={"animate-spin"} icon={faSpinner} />
        </div>
      )}
      <div className="pt-2">{text}</div>
    </div>
  );
};

export default HelpText;
