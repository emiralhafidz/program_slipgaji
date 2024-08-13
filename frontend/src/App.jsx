import "./App.css";
import Sidebar from "./Sidebar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./components/Index";
import Karyawan from "./components/Karyawan";
import Karir from "./components/Karir";
import Detail from "./components/Detail";
import User from "./components/User";
import ErrorPage from "./components/ErrorPage";
import CreateKaryawan from "./components/CreateKaryawan";
import CreateKarir from "./components/CreateKarir";
import CreateDetail from "./components/CreateDetail";
import CreateUser from "./components/CreateUser";
import Print from "./components/Print";


import EditKaryawan from "./components/EditKaryawan";
import EditKarir from "./components/EditKarir";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "karyawan",
        element: <Karyawan />,
      },
      {
        path: "karyawan/create",
        element: <CreateKaryawan />,
      },
      {
        path: "karyawan/:id/edit",
        element: <EditKaryawan />,
      },
      {
        path: "karir",
        element: <Karir />,
      },
      {
        path: "karir/create",
        element: <CreateKarir />,
      },
      {
        path: "karir/:id/edit",
        element: <EditKarir />,
      },
      {
        path: "detail",
        element: <Detail />,
      },
      {
        path: "detail/create",
        element: <CreateDetail />,
      },
      {
        path: "detail/:id/print",
        element: <Print />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "user/create",
        element: <CreateUser />,
      },
      // {
      //   path: "user/:id/edit",
      //   element: <EditUser />,
      // },
    ],
  },
]);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
