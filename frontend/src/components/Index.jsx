import React from "react";
import NotesIcon from "../assets/images/notes.png";

const Index = () => {
  return (
    <div className="h-full flex justify-center items-center flex-col gap-y-6 ">
      <div className="font-medium text-xl bg-slate-300 p-4 rounded-full">
        Selamat Datang di Aplikasi Sistem Gaji Karyawan
      </div>
      <h1 className="text-lg font-medium border-solid border-b-4 border-zinc-500">
        SMKN 1 Kota Tangerang Selatan
      </h1>
      <div className="flex justify-center items-center bg-slate-100 p-5 rounded shadow" >
        <img src={NotesIcon} className="w-14" />
        <p className="text-lg font-normal">
          Aplikasi ini dibuat untuk memudahkan anda membuat slip gaji perusahaan
        </p>
      </div>
    </div>
  );
};

export default Index;
