import { FC, useState } from "react";
import { useStatusContext } from "../App";
import { FormType, useForm } from "../hooks/useForm";
import { STATUS, StatusContextType } from "../public/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { randomOutput } from "../api/randomOutput";

interface FormProps {
  // status: string;
}

interface ButtonStatusProps {
  status: string;
  onCheckDevice?: () => void;
  onClear?: () => void;
}

interface ProcessTextProps {
  text: string;
}

const ButtonStatus: FC<ButtonStatusProps> = ({ status, onCheckDevice, onClear }) => {
  const buttonStyle = "w-44 text-white py-2 px-4 rounded-lg";
  switch (status) {
    case STATUS.waitID:
      return (
        <button className={`${buttonStyle} bg-blue-500 hover:bg-blue-600`} type="button" onClick={onCheckDevice}>
          ตรวจสอบ
        </button>
      );
    case STATUS.loading:
      return (
        <button className={`${buttonStyle} bg-blue-500 disabled:bg-blue-300  animate-bounce`} type="button" disabled={true}>
          กำลังตรวจสอบ
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
          ตรวจสอบอีกครั้ง
        </button>
      );
    default:
      return (
        <button className={`${buttonStyle} bg-red-500 hover:bg-red-600`} type="button" onClick={onCheckDevice}>
          ตรวจสอบอีกครั้ง
        </button>
      );
  }
};

enum ProcessTextType {
  gps = "กำลังตรวจสอบ GPS",
  requiredField = "* กรุณากรอกให้ครบ",
}

const ProcessText: FC<ProcessTextProps> = ({ text }) => {
  const isGpS: boolean = text === ProcessTextType.gps;
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

interface ClearButton {
  onClick?: () => void;
}
const ClearButton: FC<ClearButton> = ({ onClick }) => {
  return (
    <div className="flex flex-row text-neutral-400 text-md" onClick={onClick}>
      <p className="pt-2 underline underline-offset-4">ล้างข้อมูล</p>
    </div>
  );
};

const initForm: FormType = {
  id: "",
  lat: "",
  long: "",
};

const Form: FC<FormProps> = () => {
  const { status, setStatus, isAutoGPS } = useStatusContext() as StatusContextType;

  const [form, onChangeForm, setForm, onClearForm] = useForm(initForm);

  const isEmpty = form && Object.values(form).some((x) => !x);

  const [isProcessing, setIsProcessing] = useState(isAutoGPS);

  if (isAutoGPS && (!form?.lat && !form?.long && isProcessing)) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        const lat: string = latitude.toFixed(6).toString();
        const long: string = longitude.toFixed(6).toString();
        if (latitude && longitude) {
          setForm({ ...form, lat: lat, long: long });
        }
        setIsProcessing(false);
      },
      (err) => {
        console.log(err.message);
        setIsProcessing(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  const [processText, setProcessText] = useState(ProcessTextType.gps);
  const onClear = () => {
    setStatus(STATUS.waitID);
    onClearForm();
    setProcessText(ProcessTextType.gps);
    setIsProcessing(true);
  };

  const onCheckDevice = async () => {
    if (!isEmpty) {
      const result = randomOutput();
      setIsProcessing(false);
      setStatus(STATUS.loading);
      await setTimeout(() => {
        setStatus(result);
      }, 1000);
      return;
    }
    setProcessText(ProcessTextType.requiredField);
    setIsProcessing(true);
  };

  return (
    <div className="flex flex-col justify-center items-center w-9/12 ">
      <form className="w-full mb-3">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 inline-block" htmlFor="id">
            device id
          </label>

          <input
            className={`appearance-none h-12 block w-full bg-white text-gray-700 text-center border border-neutral-400 rounded-lg py-3 px-4 mb-3 leading-tight placeholder-neutral-400 focus:outline-none focus:placeholder-white disabled:bg-gray-200`}
            id="id"
            type="number"
            name="id"
            placeholder="กรอกไอดีอุปกรณ์"
            value={form?.id}
            onChange={onChangeForm}
          />
        </div>
        <div className="flex flex-wrap ">
          <div className="w-2/4 px-3 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lat">
              latitude
            </label>
            <input
              className="disabled:bg-gray-200 appearance-none block w-full bg-white text-gray-700 text-center border border-neutral-400 rounded-lg py-3 px-4 mb-3 leading-tight placeholder-neutral-400 focus:outline-none focus:placeholder-white"
              id="lat"
              name="lat"
              type="number"
              placeholder="ละจิจูด"
              value={form?.lat}
              onChange={onChangeForm}
              disabled={isProcessing && processText === ProcessTextType.gps}
            />
          </div>
          <div className="w-2/4  md:w-1/2 px-3">
            <label className="font-prompt block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="long">
              longitude
            </label>
            <input
              className="disabled:bg-gray-200 appearance-none block w-full bg-white text-gray-700 text-center border border-neutral-400 rounded-lg py-3 px-4 mb-3 leading-tight placeholder-neutral-400 focus:outline-none focus:placeholder-white "
              id="long"
              name="long"
              type="number"
              placeholder="ลองติจูด"
              value={form?.long}
              onChange={onChangeForm}
              disabled={isProcessing && processText === ProcessTextType.gps}
            />
          </div>
        </div>
      </form>
      {<ButtonStatus status={status} onCheckDevice={onCheckDevice} onClear={onClear} />}
      {isProcessing && <ProcessText text={processText} />}
      {(status === STATUS.notFound || status === STATUS.noDevice) && <ClearButton onClick={onClear} />}
    </div>
  );
};

export default Form;
