import UserIcon from "../assets/images/user.png";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  return (
    <div className="flex justify-between items-center py-[8px] px-4 shadow-md">
      <div className="grow flex justify-center items-center">
        <div className="flex justify-between items-center h-10 px-4 w-2/3 bg-gray-100 rounded-full gap-2">
          <BiSearch className="text-xl"/>
          <input type="text" placeholder="Masukkan Pencarian" className="w-full h-full outline-none bg-transparent"/>
        </div>
      </div>
      <div>
        <img src={UserIcon} className="w-10 cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
