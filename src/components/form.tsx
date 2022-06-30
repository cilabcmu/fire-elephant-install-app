import { COLOR } from "../public/color";

const Form = () => {
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
            placeholder="fill the device id"
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
              type="number"
              placeholder="latitude"
            />
          </div>
          <div className="w-2/4  md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="long">
              longitude
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 text-center border border-neutral-400 rounded-lg py-3 px-4 mb-3 leading-tight placeholder-neutral-400 focus:outline-none focus:placeholder-white "
              id="long"
              type="number"
              placeholder="longitude"
            />
          </div>
        </div>
      </form>

      <button className={`bg-blue-500 hover:bg-blue-700 w-32 text-white font-bold py-2 px-4 rounded-lg`} type="button">
        Sign In
      </button>
    </div>
  );
};

export default Form;
