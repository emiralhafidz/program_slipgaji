// import DashboardIcon from "./assets/images/dashboard.png";
// import DetailIcon from "./assets/images/detail.png";
// import ItemIcon from "./assets/images/item.png";
import { BiSolidDashboard, BiBriefcase, BiCalendarPlus, BiSolidUserPlus } from "react-icons/bi";


export const ItemLinks = [
  {
    path: "/karyawan",
    name: "Karyawan",
    icon: <BiSolidDashboard/>,
  },
  {
    path: "/karir",
    name: "Karir",
    icon: <BiBriefcase/>,
  },
  {
    path: "/detail",
    name: "Cetak",
    icon: <BiCalendarPlus/>,
  },
  {
    path: "/user",
    name: "user",
    icon: <BiSolidUserPlus/>,
  },
];