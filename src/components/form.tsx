import { FC } from "react";
import { useStatusContext } from "../App";
import { FormType, useForm } from "../hooks/useForm";
import { STATUS, StatusContextType } from "../public/type";

interface FormProps {
  // status: string;
}

const buttonStatus: (status: string) => JSX.Element = (status: string) => {
  const buttonStyle = "w-44 text-white py-2 px-4 rounded-lg";
  switch (status) {
    case STATUS.waitID:
      return (
        <button className={`${buttonStyle} bg-blue-500 hover:bg-blue-600`} type="button">
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
        <button className={`${buttonStyle} bg-green-500 hover:bg-green-600`} type="button">
          ล้างข้อมูล
        </button>
      );
    case STATUS.notFound:
      return (
        <button className={`${buttonStyle} bg-orange-500 hover:bg-orange-600`} type="button">
          ตรวจสอบอีกครั้ง
        </button>
      );
    default:
      return (
        <button className={`${buttonStyle} bg-red-500 hover:bg-red-600`} type="button">
          ตรวจสอบอีกครั้ง
        </button>
      );
  }
};

const initForm: FormType = {
  id: "",
  lat: "",
  long: "",
};

const Form: FC<FormProps> = () => {
  const { status, setStatus } = useStatusContext() as StatusContextType;

  const [form, onChangeForm, onClear] = useForm(initForm);

  return (
    <div className="flex flex-col justify-center items-center w-9/12 ">
      <form className="w-full mb-3">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="id">
            device id
          </label>
          <input
            className={`appearance-none h-12 block w-full bg-white text-gray-700 text-center border border-neutral-400 rounded-lg py-3 px-4 mb-3 leading-tight placeholder-neutral-400 focus:outline-none focus:placeholder-white`}
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
              className="appearance-none block w-full bg-white text-gray-700 text-center border border-neutral-400 rounded-lg py-3 px-4 mb-3 leading-tight placeholder-neutral-400 focus:outline-none focus:placeholder-white"
              id="lat"
              name="lat"
              type="number"
              placeholder="ละจิจูด"
              value={form?.lat}
              onChange={onChangeForm}
            />
          </div>
          <div className="w-2/4  md:w-1/2 px-3">
            <label className="font-prompt block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="long">
              longitude
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 text-center border border-neutral-400 rounded-lg py-3 px-4 mb-3 leading-tight placeholder-neutral-400 focus:outline-none focus:placeholder-white "
              id="long"
              name="long"
              type="number"
              placeholder="ลองติจูด"
              value={form?.long}
              onChange={onChangeForm}
            />
          </div>
        </div>
      </form>
      {buttonStatus(status)}
    </div>
  );
};

export default Form;
