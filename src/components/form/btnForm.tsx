import { FC } from "react";
import { STATUS } from "../../public/type";

interface ButtonProps {
  onClear?: () => void;
}

interface ButtonFormProps extends ButtonProps {
  status: string;
  onCheckDevice?: () => void;
}

const ClearButton: FC<ButtonProps> = ({ onClear }) => {
  return (
    <div className="flex flex-row text-neutral-400 text-md" onClick={onClear}>
      <p className="pt-2 underline underline-offset-4">ล้างข้อมูล</p>
    </div>
  );
};

const ButtonForm: FC<ButtonFormProps> = ({ status, onCheckDevice, onClear }) => {
  const buttonStyle = "w-44 text-white py-3 px-4 rounded-lg";
  switch (status) {
    case STATUS.waitID:
      return (
        <button className={`${buttonStyle} bg-blue-500 hover:bg-blue-600`} type="button" onClick={onCheckDevice}>
          ดำเนินการ
        </button>
      );
    case STATUS.loading:
      return (
        <button className={`${buttonStyle} bg-blue-500 disabled:bg-blue-300  animate-bounce`} type="button" disabled={true}>
          กำลังดำเนินการ
        </button>
      );
    case STATUS.found:
      return (
        <button className={`${buttonStyle} bg-green-500 hover:bg-green-600`} type="button" onClick={onClear}>
          ล้างข้อมูล
        </button>
      );
    case STATUS.notFound:
      return (
        <button className={`${buttonStyle} bg-orange-500 hover:bg-orange-600`} type="button" onClick={onCheckDevice}>
          ดำเนินการอีกครั้ง
        </button>
      );
    default:
      return (
        <button className={`${buttonStyle} bg-red-500 hover:bg-red-600`} type="button" onClick={onCheckDevice}>
          ดำเนินการอีกครั้ง
        </button>
      );
  }
};

export { ButtonForm, ClearButton };
