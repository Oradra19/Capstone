import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-8 py-6 shadow-md bg-[#9AA6B2] rounded-b-2xl">
      <img src="/public/assets/logo.png" alt="logo" className="h-20" />
      <div className="flex items-center justify-center gap-6 w-full max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Mau liburan kemana hari ini?" 
          className="w-full rounded-full border px-4 py-2 shadow"
        />
      </div>
      <div className="flex gap-6">
        <button className="bg-white text-gray-700 px-4 py-2 rounded-full flex items-center gap-2">Log in</button>
        <button className="bg-gray-300 px-6 py-3 rounded-full">Daftar</button>
      </div>
    </div>
  );
};

export default Navbar;
