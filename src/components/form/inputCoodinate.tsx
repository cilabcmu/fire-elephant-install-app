import { ChangeEvent, FC } from "react";

interface InputCoordinateProps {
  labelId: string;
  labelText: string;
  coordinate: string | undefined;
  onChangeCoordinate: (event: ChangeEvent<HTMLInputElement>) => void;
  isDisable: boolean;
}

const InputCoordinate: FC<InputCoordinateProps> = ({ labelId, labelText, coordinate, onChangeCoordinate, isDisable }) => {
  return (
    <>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={labelId}>
        {labelText}
      </label>
      <input
        className="disabled:bg-gray-200 appearance-none block w-full bg-white text-gray-700 text-center border border-neutral-400 rounded-lg py-3 px-4 mb-3 leading-tight placeholder-neutral-400 focus:outline-none focus:placeholder-white"
        id={labelId}
        name={labelId}
        type="number"
        placeholder="ละจิจูด"
        value={coordinate}
        onChange={onChangeCoordinate}
        disabled={isDisable}
        maxLength={9}
      />
    </>
  );
};

export default InputCoordinate;
