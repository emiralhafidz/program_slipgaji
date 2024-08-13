import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

const CreateKaryawan = () => {
  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (nama !== "" && nip !== "" && alamat !== "" && email !== "") {
        const res = await axios.post("http://localhost:3000/guru", {
          nama,
          nip,
          alamat,
          email,
        });
        setMessage(res.data.message);
        console.log(res.data);
        alert('Data berhasil dimasukkan')
        //Reset Form
        setNama("");
        setNip("");
        setAlamat("");
        setEmail("");
        setTimeout(() => {
          navigate("/karyawan")
        }, 1000);
      }
      else{
        setMessage('Pastikan semua form terisi dengan benar !!')
      }
    } catch (error) {
      setMessage("Error Inserting Data");
      console.log(error);
    }
  };

  return (
    <div className="border p-10">
      <form onSubmit={handleSubmit} className="mx-auto w-2/4">
        <h1 className="font-medium mb-10 text-center">Tambah Data Karyawan</h1>
        {message && <p className="mt-4 text-center">{message}</p>}
        {/* ----------------------- NAMA -------------------------- */}
        <div className="mb-6">
          <label
            htmlFor=""
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Nama
          </label>
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            type="text"
            placeholder="Emir Al Hafidz"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
          <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
        </div>
        {/* ----------------------- NIP -------------------------- */}
        <div className="mb-6">
          <label
            htmlFor=""
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            NIP
          </label>
          <input
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            type="text"
            placeholder="354353"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        {/* -----------------------  Alamat -------------------------- */}
        <div className="mb-6">
          <label
            htmlFor=""
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Alamat
          </label>
          <input
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            type="text"
            placeholder="Jl. Sambilegi Kidul Maguwoharjo"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        {/* -----------------------  Email -------------------------- */}
        <div className="mb-6">
          <label
            htmlFor=""
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="bobi@gmail.com"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
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

export default CreateKaryawan;
