import { COLOR } from "../public/color";

const Status = () => {
  const flag = false;
  return (
    <div className="flex flex-col justify-center items-center w-full p-10">
      <div
        className={
          flag
            ? "flex justify-center items-center box-content h-32 w-32 p-4  border border-4 rounded-2xl"
            : `flex justify-center items-center box-content h-32 w-32 p-4  border border-4 rounded-2xl border-blue-500`
        }
      >
        <div className={flag ? "text-9xl" : `text-9xl text-blue-500`}>?</div>
      </div>
      <div className={`flex justify-center items-center mt-5 text-3xl font-medium`}>Please fill device id</div>
    </div>
  );
};

export default Status;
