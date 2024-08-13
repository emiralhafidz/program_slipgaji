import { ItemLinks } from "./ItemLinks";
import { Outlet, NavLink } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const listActive = (index) => {
    setIsClicked(index);
  };

  return (
    <div className="flex min-h-screen">
      <div
        id="sidebar"
        className={`bg-amber-50 shadow-2xl ${isOpen ? "w-72" : "sm:w-fit"}`}
      >
        <div className="flex items-center justify-between bg-slate-700 p-3">
          <h1 className="font-normal text-white cursor-pointer">
            <NavLink to="/" className={`${isOpen ? "block" : "hidden"}`}>
              Sistem Gaji
            </NavLink>
          </h1>
          <div
            className="hamburger flex flex-col gap-y-1 bg-slate-300 py-2 px-1.5 rounded cursor-pointer"
            onClick={toggleSidebar}
          >
            <div className="w-7 h-0.5 bg-black"></div>
            <div className="w-7 h-0.5 bg-black"></div>
            <div className="w-7 h-0.5 bg-black"></div>
          </div>
        </div>
        <ul className=" flex justify-center flex-col items-center gap-y-6 mt-8">
          {ItemLinks.map((item, index) => (
            <li
              key={index}
              className={`group w-full `}
              onClick={() => listActive(index)}
            >
              <NavLink
                to={item.path}
                className={`flex items-center group-hover:bg-slate-300 p-2 gap-x-3  ${
                  isOpen
                    ? "justify-start rounded-r-full"
                    : "justify-center rounded-none"
                } ${isClicked === index ? "bg-slate-300" : ""} `}
              >
                <div className=" group-hover:bg-white p-1.5 rounded-full text-lg">
                  {item.icon}
                </div>
                <div
                  className={`font-sans font-normal ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  {item.name}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div id="detail" className="grow">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
