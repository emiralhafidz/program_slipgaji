import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const CreateDetail = () => {
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [namaList, setNamaList] = useState([]);
  const [jabatanList, setJabatanList] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getNama();
    getJabatan();
  }, []);

  const getNama = async () => {
    try {
      const response = await axios.get("http://localhost:3000/guru");
      const filteredData = response.data[0].payload.map((item) => ({
        nama: item.nama,
      }));
      setNamaList(filteredData);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const getJabatan = async () => {
    try {
      const response = await axios.get("http://localhost:3000/karir");
      const filteredData = response.data[0].payload.map((item) => ({
        jabatan: item.jabatan,
      }));
      setJabatanList(filteredData);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (nama !== "" && jabatan !== "") {
        const res = await axios.post("http://localhost:3000/detail", {
          nama,
          jabatan,
        });
        setMessage(res.data.message);
        console.log(res.data);
        alert("Data berhasil dimasukkan");
        //Reset Form
        setNama("");
        setJabatan("");
        setTimeout(() => {
          navigate("/detail")
        }, 1000);
      } else {
        setMessage("Pastikan semua form terisi dengan benar !!");
      }
    } catch (error) {
      setMessage("Error Inserting Data");
      console.log(error);
    }
  };

  return (
    <div className="border p-10">
      <form onSubmit={handleSubmit} className="mx-auto w-2/4">
        <h1 className="font-medium mb-10 text-center">Tambah Data Jabatan</h1>
        {message && <p className="mt-4 text-center">{message}</p>}

        {/* ----------------------- Nama -------------------------- */}
        <div className="mb-6">
          <label
            htmlFor="nama"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Nama
          </label>
          <select
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="" disabled>
              Pilih Nama
            </option>
            {namaList.map((item, index) => (
              <option key={index} value={item.nama}>
                {item.nama}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>

        {/* ----------------------- Jabatan -------------------------- */}
        <div className="mb-6">
          <label
            htmlFor="jabatan"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Jabatan
          </label>
          <select
            id="jabatan"
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="" disabled>
              Pilih Jabatan
            </option>   
            {jabatanList.map((item, index) => (
              <option key={index} value={item.jabatan}>
                {item.jabatan}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>

        <div className="text-center mt-4">
          <button
            type="submit"
            className="text-center px-3 py-1 rounded bg-sky-600 text-emerald-50"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDetail;
