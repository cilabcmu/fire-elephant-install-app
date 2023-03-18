import { ChangeEvent, FC } from "react";
import { STATUS } from "../../public/type";

interface InputIDProps {
  deviceID: string | undefined;
  onChangeForm: (event: ChangeEvent<HTMLInputElement>) => void;
  status: string;
}

const InputID: FC<InputIDProps> = ({ deviceID, onChangeForm, status }) => {
  return (
    <>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 inline-block" htmlFor="id">
        device id
      </label>

      <input
        className={`appearance-none h-12 block w-full bg-white text-gray-700 text-center border border-neutral-400 rounded-lg py-3 px-4 mb-3 leading-tight placeholder-neutral-400 focus:outline-none focus:placeholder-white disabled:bg-gray-200`}
        id="id"
        type="number"
        name="id"
        placeholder="กรอกไอดีอุปกรณ์"
        value={deviceID}
        onChange={onChangeForm}
        disabled={status == STATUS.found}
      />
    </>
  );
};

export default InputID
