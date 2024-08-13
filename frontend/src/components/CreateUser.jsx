import { useState } from "react";
import axios from "axios";

const CreateKaryawan = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");   

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username !== "" && password !== "") {
        const res = await axios.post("http://localhost:3000/user", {
          username,
          password,
        });
        setMessage(res.data.message);
        console.log(res.data);
        alert('Data berhasil dimasukkan')
        //Reset Form
        setUsername("");
        setPassword("");
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
        <h1 className="font-medium mb-10 text-center">Tambah Akun</h1>
        {message && <p className="mt-4 text-center">{message}</p>}
        {/* ----------------------- Username -------------------------- */}
        <div className="mb-6">
          <label
            htmlFor=""
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="eahafidz@gmail.com"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        {/* ----------------------- Password -------------------------- */}
        <div className="mb-6">
          <label
            htmlFor=""
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="354353"
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
