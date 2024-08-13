import LogoAmikom from "../assets/images/amikom.png";
import Ttd from "../assets/images/ttd.png";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {useReactToPrint} from 'react-to-print'

import axios from "axios";

const SlipGaji = () => {
  const [nama, setNama] = useState("");
  const [nip, setNip] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [gajiPokok, setGajiPokok] = useState("");
  const [thr, setThr] = useState("");
  const [tunjanganAnak, setTunjanganAnak] = useState("");
  const [tunjanganKesehatan, setTunjanganKesehatan] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  const { id } = useParams();

  const totalGaji = gajiPokok + thr + tunjanganAnak + tunjanganKesehatan;

  const today = new Date();
  const tanggalGaji = () => {
    // Mendapatkan hari, bulan, dan tahun
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // getMonth() mengembalikan nilai bulan dari 0-11
    const year = today.getFullYear();

    // Format tanggal
    const date = `${day}-${month}-${year}`;
    setFormattedDate(date)
  };

  useEffect(() => {
    getData();
    tanggalGaji();
  }, );

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/detail/${id}`);
      const data = response.data[0].payload.find((p) => p.id === parseInt(id));
      if (data) {
        setNama(data.nama);
        setNip(data.nip);
        setJabatan(data.jabatan);
        setGajiPokok(data.gaji_pokok);
        setThr(data.thr);
        setTunjanganAnak(data.tunjangan_anak);
        setTunjanganKesehatan(data.tunjangan_kesehatan);
      }
    } catch (error) {
      console.log("Error Fetching Data", error);
    }
  };

  let componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content : ()=>componentRef.current,
    documentTitle : `Slip Gaji ${nama} tanggal ${formattedDate}`,
    onPrintError : ()=> alert('there is an error when printing')
  })


  return (
    <>
    <div className="border mx-auto mb-4 px-3 w-[559px] h-[793px] py-8" ref={componentRef}>
      {/* Header Slip Gaji */}
      <div className=" border-b-4 border-black flex justify-center items-center gap-3 w-3/4 mx-auto pb-3 mb-8">
        <img src={LogoAmikom} className="w-20 h-20" />
        <div>
          <h1 className="font-medium text-xl">
            SMKN 1 Kota Tangerang Selatan
          </h1>
          <p>
            JL. WARU KANTOR KELURAHAN CIATER, Ciater, Kec. Serpong, Kota
            Tangerang Selatan, Banten, dengan kode pos 15310.
          </p>
        </div>
      </div>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">Slip Gaji Guru</h3>
      </div>
      {/* Data Slip Gaji */}
      <div className="px-9">
        <div className="flex gap-3">
          Nama :{" "}
          <span className="border-b-3 border-black border-dashed">{nama}</span>{" "}
        </div>
        <div className="flex gap-3">
          NIP : <span>{nip}</span>{" "}
        </div>
        <div className="flex gap-3">
          Jabatan : <span>{jabatan}</span>{" "}
        </div>
        <br />
        <div className="flex gap-3">
          Gaji Pokok : <span>Rp. {gajiPokok}</span>{" "}
        </div>
        <div className="flex gap-3">
          THR : <span>Rp. {thr}</span>{" "}
        </div>
        <div className="flex gap-3">
          Tunjangan Anak : <span>Rp. {tunjanganAnak}</span>{" "}
        </div>
        <div className="flex gap-3">
          Tunjangan Kesehatan : <span>Rp. {tunjanganKesehatan}</span>{" "}
        </div>
        <div className="flex gap-3 items-center borde bg-slate-400 my-4 rounded py-2 justify-center">
          <h1 className="font-bold"> Total yang diterima : </h1>
          <span className="font-medium">Rp. {totalGaji}</span>
        </div>
        <div>
          Tanggal Penyerahan : <span>{formattedDate}</span>
        </div>
      </div>

      {/* TTD Slip Gaji */}

      <div className="flex justify-between px-9 mt-[100px]">
        <div>
          <h1>Diserahkan Oleh</h1>
          <img src={Ttd} className="w-24" />
          <p className="font-medium">Muhammad Emir Al Hafidz</p>
        </div>

        <div>
          <h1 className="mb-12">Diterima Oleh</h1>

          <p className="font-medium">{nama}</p>
        </div>
      </div>
    </div>
    <div className="text-center mb-10 print:hidden">
      <button className="bg-sky-600 px-3 py-1 rounded font-medium" onClick={handlePrint}>Print Slip Gaji</button>
    </div>
    </>

  );
};

export default SlipGaji;
