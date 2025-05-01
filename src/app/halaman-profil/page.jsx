import React from "react";

const Profile = () => {
  console.log("Profile Page Rendered");
  return (
    <div className="min-h-screen bg-[#f3f3f3] font-sans">
      <div className="w-full h-[120px] bg-[#9AA6B2] rounded-b-2xl shadow-md px-8 py-6 flex items-center justify-between relative">
        <img src="/assets/logo.png" alt="logo" className="h-20" />

        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-center text-4xl font-bold text-black mb-6">
            Profile
          </h1>
        </div>
      </div>

      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/assets/icons/user-profil2.png"
            alt="User"
            className="w-24 h-24 rounded-full  border-gray-300"
          />
          <h2 className="text-2xl font-bold">Kenzabar</h2>
          <p className="text-gray-600 italic">kenzabarberkahbarokahselalujosjis@gmail.com</p>
        </div>

        <div className="mt-6 w-full">
          <div className="space-y-3 text-sm text-gray-700 mt-3">
            <p>
              <span className="font-semibold w-40 inline-block">
                Nama Lengkap:
              </span>{" "}
              Kenzabar Berkah Abadi
            </p>
            <p>
              <span className="font-semibold w-40 inline-block">
                Tanggal Lahir:
              </span>{" "}
              1 Januari 1999
            </p>
            <p>
              <span className="font-semibold w-40 inline-block">
                Jenis Kelamin:
              </span>{" "}
              Laki-laki
            </p>
            <p>
              <span className="font-semibold w-40 inline-block">Alamat:</span>{" "}
              Siswodipuran, Boyolali
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="font-bold text-black px-4 py-2 rounded-full flex  gap-2">
            <img src="/assets/icons/edit.png" alt="edit" className="w-6 h-6" />
            Edit
          </button>
        </div>
      </div>

      <footer className="bg-gray-800 py-4 mt-8">
        <p className="text-center text-lg text-blue-600 mt-8 mb-4">
          Welcome to our website!
        </p>
        <p className="text-center text-sm text-white">copyright @timcapstone</p>
      </footer>
    </div>
  );
};

export default Profile;
