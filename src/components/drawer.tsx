import { FC } from "react";

interface DrawerProps {
  //   children: JSX.IntrinsicElements;
  isOpen: boolean;
  setIsOpen: () => void;
}
const Drawer: FC<DrawerProps> = ({ isOpen, setIsOpen }) => {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen ? " transition-opacity opacity-100 duration-500 translate-x-24  " : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-22 " : " translate-x-full ")
        }
        onClick={() => console.log("test")}
      >
        {/* <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="p-4 font-bold text-lg">Header</header>
          {children}
        </article> */}
      </section>

    </main>
  );
};

export default Drawer;
