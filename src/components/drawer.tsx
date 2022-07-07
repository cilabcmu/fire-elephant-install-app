import { FC } from "react";
import { useStatusContext } from "../App";
import { StatusContextType } from "../public/type";
import Card from "./menu/card";
import { contact } from "./menu/contact";

interface DrawerProps {
  //   children: JSX.IntrinsicElements;
  // isOpen: boolean;
  // setIsOpen: (value?: boolean) => void;
}
const Drawer: FC<DrawerProps> = () => {
  const { isOpenDrawer, setOpenDrawer } = useStatusContext() as StatusContextType;

  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpenDrawer ? " transition-opacity opacity-100 duration-500 translate-x-0  " : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          "w-9/12 max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpenDrawer ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative max-w-lg pb-10 flex flex-col space-y-4 overflow-y-scroll h-full">
          <header className="p-4 font-bold text-lg">ติดต่อ</header>
          {contact.map(({ phoneNumber, name }, id) => (
            <Card phoneNumber={phoneNumber} name={name} />
          ))}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setOpenDrawer(false);
        }}
      ></section>
    </main>
  );
};

export default Drawer;
