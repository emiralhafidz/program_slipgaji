import { useState, useEffect } from "react";
// import { DataKaryawan } from "./DataTable";
import Pagination from "./Pagination";
import { BiSolidTrash, BiEdit } from "react-icons/bi";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";

const TableKaryawan = () => {
  const [pegawai, setPegawai] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = pegawai.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/guru");
      setPegawai(response.data[0].payload);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const deletePegawai = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/guru/${id}`);
      fetchData();
    } catch (error) {
      console.log("error deleting data", error);
    }
  };

  return (
    <div className="relative w-5/6 mx-auto mt-[50px]">
      <div className="text-right ">
        <div className="bg-cyan-500 px-4 py-2 mb-4 shadow-xl rounded-xl font-medium inline-block">
          <NavLink to="/karyawan/create">Tambah Data</NavLink>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto mx-auto mb-20 bg-white shadow-2xl w-full min-w-[400px]">
          <thead>
            <tr className="border-4 border-b-indigo-500 ">
              <th className="bg-gray-200 p-4">Action</th>
              <th className="bg-gray-200 p-4">Nama</th>
              <th className="bg-gray-200 p-4">NIP</th>
              <th className="bg-gray-200 p-4">Alamat</th>
              <th className="bg-gray-200 p-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((data) => (
              <tr
                key={data.id}
                className="odd:bg-white even:bg-slate-50 hover:bg-gray-200"
              >
                <td className="py-4 px-2 flex items-center justify-center gap-3">
                  <BiSolidTrash
                    onClick={() => deletePegawai(data.id)}
                    className="bg-red-600	 py-1 px-1.5 rounded cursor-pointer text-3xl text-slate-200"
                  />
                  <NavLink to={`/karyawan/${data.id}/edit`}>
                    <BiEdit className=" bg-yellow-400 py-1 px-1.5 rounded cursor-pointer text-3xl text-netral-900" />
                  </NavLink>
                </td>
                <td className="py-4 px-2 text-center">{data.nama}</td>
                <td className="py-4 px-2 text-center">{data.nip}</td>
                <td className="py-4 px-2 text-center">{data.alamat}</td>
                <td className="py-4 px-2 text-center">{data.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalRows={pegawai.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TableKaryawan;
