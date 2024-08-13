import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EditKaryawan = () => {
  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getPegawaiById();
  },);

  const getPegawaiById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/guru/${id}`);
      const data = response.data[0].payload.find((p) => p.id === parseInt(id));
      if (data) {
        setNama(data.nama);
        setNip(data.nip);
        setAlamat(data.alamat);
        setEmail(data.email);
      }
    } catch (error) {
      console.log("Error Updating Data", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (nama !== "" && alamat !== "" && email !== "") {
        await axios.put(`http://localhost:3000/guru/${id}`, {
          nama,
          nip,
          alamat,
          email,
        });
        setMessage("Data berhasil diperbarui!");
        setTimeout(() => {
          navigate("/karyawan");
        }, 1000);
      } else {
        setMessage("Pastikan semua form terisi dengan benar !!");
      }
    } catch (error) {
      console.log("Error updating data", error);
      setMessage("Error Updating data!");
    }
  };

  return (
    <div className="border p-10">
      <form onSubmit={handleSubmit} className="mx-auto w-2/4">
        <h1 className="font-medium mb-10 text-center">Edit Data Karyawan</h1>
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
            placeholder="35444445"
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

export default EditKaryawan;
