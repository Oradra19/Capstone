import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="w-full h-[160px] bg-[#9AA6B2] rounded-b-2xl shadow-md px-8 py-6 flex items-center justify-between">
      <img src="/assets/logo.png" alt="logo" className="h-20" />

      <div className="flex-1 flex justify-center relative">
        <input
          type="text"
          placeholder="Mau liburan kemana hari ini?"
          className="w-full max-w-lg h-12 text-center rounded-full border border-gray-300 px-10 py-3 shadow bg-white placeholder-gray-500"
        />
        <i className="fas fa-search text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 text-lg"></i>
      </div>

      <div className="flex gap-2">
        {/* Ganti button dengan Link */}
        <Link
          to="/login"
          state={{ backgroundLocation: location }}
          className="bg-gray-300 px-5 py-2 text-sm rounded-full shadow flex items-center gap-2"
        >
          <i className="fas fa-user-circle text-gray-500 text-lg"></i>
          Log in
        </Link>

        <Link
          to="/register"
          state={{ backgroundLocation: location }}
          className="bg-white text-gray-700 px-6 py-3 text-lg flex items-center gap-2 rounded-full shadow"
        >
          <i className="fas fa-user-plus"></i> Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
