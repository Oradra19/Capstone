import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#f3f3f3] font-sans">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 shadow-md bg-[#d4dae2] rounded-b-2xl">
        <img src="/assets/logo.png" alt="Logo" className="h-12" />
        <div className="flex items-center gap-2">
          <i className="fas fa-user-circle text-white text-xl"></i>
          <img
            src="/assets/icons/user-profile.png"
            alt="User"
            className="w-6 h-6 rounded-full border"
          />
          <span className="font-bold">KENZABAR</span>
          <i className="fas fa-chevron-down text-xs text-black"></i>
        </div>
      </div>

      {/* Judul */}
      <h1 className="text-center text-3xl font-bold mt-8 mb-4">
        Profil Pengguna
      </h1>

      {/* Card Profil */}
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/assets/icons/user-profile.png"
            alt="User"
            className="w-24 h-24 rounded-full border-4 border-gray-300"
          />
          <h2 className="text-2xl font-bold">Kenzabar Alfarisi</h2>
          <p className="text-gray-600 italic">kenzabar@email.com</p>
        </div>

        {/* Detail Info */}
        <div className="mt-6 w-full">
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">
            Informasi Pengguna
          </h3>
          <div className="space-y-3 text-sm text-gray-700 mt-3">
            <p>
              <span className="font-semibold w-40 inline-block">
                Nama Lengkap:
              </span>{" "}
              Kenzabar Alfarisi
            </p>
            <p>
              <span className="font-semibold w-40 inline-block">
                Tanggal Lahir:
              </span>{" "}
              1 Januari 2000
            </p>
            <p>
              <span className="font-semibold w-40 inline-block">
                Jenis Kelamin:
              </span>{" "}
              Laki-laki
            </p>
            <p>
              <span className="font-semibold w-40 inline-block">Alamat:</span>{" "}
              Jl. Merdeka No.123, Surakarta
            </p>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-6 text-right">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md">
            Edit Profil
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-4 text-center text-sm text-gray-600 bg-gray-300">
        copyright @nasidanbuburbuis
      </footer>
    </div>
  );
};

export default Profile;
