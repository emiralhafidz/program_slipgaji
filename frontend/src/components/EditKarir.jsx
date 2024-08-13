import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EditKarir = () => {
  const [jabatan, setJabatan] = useState("");
  const [gajiPokok, setGajiPokok] = useState("");
  const [thr, setThr] = useState("");
  const [tunjanganAnak, setTunjanganAnak] = useState("");
  const [tunjanganKesehatan, setTunjanganKesehatan] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getKarirById();
  }, );

  const getKarirById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/karir/${id}`);
      const data = response.data[0].payload.find((p) => p.id === parseInt(id));
      if (data) {
        setJabatan(data.jabatan);
        setGajiPokok(data.gaji_pokok);
        setThr(data.thr);
        setTunjanganAnak(data.tunjangan_anak);
        setTunjanganKesehatan(data.tunjangan_kesehatan);
      }
    } catch (error) {
      console.log("Error Updating Data", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (jabatan !== "" && gajiPokok !== "" && thr !== "" && tunjanganAnak !== "" && tunjanganKesehatan !== "") {
        await axios.put(`http://localhost:3000/karir/${id}`, {
          jabatan,
          gajiPokok,
          thr,
          tunjanganAnak,
          tunjanganKesehatan,
        });
        setMessage("Data berhasil diperbarui!");
        setTimeout(() => {
          navigate("/karir");
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
        {/* ----------------------- Jabatan -------------------------- */}
        <div className="mb-6">
          <label
            htmlFor=""
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Jabatan
          </label>
          <input
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
            type="text"
            placeholder="Direktor"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
          <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
        </div>
        {/* -----------------------  Gaji Pokok -------------------------- */}
        <div className="mb-6">
          <label
            htmlFor=""
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Gaji Pokok
          </label>
          <input
            value={gajiPokok}
            onChange={(e) => setGajiPokok(e.target.value)}
            type="text"
            placeholder="4000000"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        {/* ----------------------- THR -------------------------- */}
        <div className="mb-6">
          <label
            htmlFor=""
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            THR
          </label>
          <input
            value={thr}
            onChange={(e) => setThr(e.target.value)}
            type="text"
            placeholder="4000000"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        {/* -----------------------  tunjangan Anak -------------------------- */}

        <div className="mb-6">
          <label
            htmlFor=""
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
           Tunjangan Anak
          </label>
          <input
            value={tunjanganAnak}
            onChange={(e) => setTunjanganAnak(e.target.value)}
            type="text"
            placeholder="4000000"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>

        {/* -----------------------  Tunjangan Kesehatan -------------------------- */}

        <div className="mb-6">
          <label
            htmlFor=""
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Tunjangan Kesehatan
          </label>
          <input
            value={tunjanganKesehatan}
            onChange={(e) => setTunjanganKesehatan(e.target.value)}
            type="text"
            placeholder="4000000"
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

export default EditKarir;
