import React, { useState } from "react";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState({
    namaTampilan: "Kenzabar",
    email: "kenzabarberkahbarokahselalujosjis@gmail.com",
    namaLengkap: "Kenzabar Berkah Abadi",
    tanggalLahir: "1 Januari 1999",
    jenisKelamin: "Laki-laki",
    alamat: "Siswodipuran, Boyolali",
  });

  const [formData, setFormData] = useState(profile);

  const openModal = () => {
    setFormData(profile); // isi form dengan data yang ada
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSimpan = () => {
    setProfile(formData);
    setShowModal(false);
    alert("Profil berhasil disimpan!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFC] font-sans">
      <div className="flex justify-between items-center p-6">
        <img src="/assets/logo2.png" alt="Logo" className="h-20 drop-shadow-lg" />
      </div>


      <div className="flex-grow">
  <div className="max-w-xl mx-auto bg-white rounded-xl shadow-xl p-6 mt-6 transition-all hover:shadow-2xl">
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <img 
          src="/assets/icons/user-profil2.png" 
          alt="User" 
          className="w-28 h-28 rounded-full border-4 shadow-lg transition-all transform hover:scale-110" 
        />
        <div className="absolute bottom-0 right-0 bg-[#d3dd60] p-1 rounded-full">
          <img src="/assets/icons/edit.png" alt="edit" className="w-5 h-5 text-white" />
        </div>
      </div>
      <h2 className="text-3xl font-semibold text-gray-800">{profile.namaTampilan}</h2>
      <p className="text-gray-500 italic">{profile.email}</p>
    </div>

    <div className="mt-6 w-full space-y-4 text-sm text-gray-800">
      <div className="flex justify-between">
        <span className="font-semibold w-40 inline-block">Nama Lengkap:</span> 
        <span>{profile.namaLengkap}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold w-40 inline-block">Tanggal Lahir:</span> 
        <span>{profile.tanggalLahir}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold w-40 inline-block">Jenis Kelamin:</span> 
        <span>{profile.jenisKelamin}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold w-40 inline-block">Alamat:</span> 
        <span>{profile.alamat}</span>
      </div>
    </div>

    <div className="mt-6 flex justify-end">
      <button 
        onClick={openModal} 
        className="font-bold text-black px-4 py-2 rounded-full  hover:bg-[#d3dd60] transition-all flex gap-2"
      >
        <img src="/assets/icons/edit.png" alt="edit" className="w-6 h-6" />
        Edit
      </button>
    </div>
  </div>
</div>



      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <div className="space-y-4">
              {[
                { label: "Nama Tampilan", name: "namaTampilan" },
                { label: "Email", name: "email" },
                { label: "Nama Lengkap", name: "namaLengkap" },
                { label: "Tanggal Lahir", name: "tanggalLahir" },
                { label: "Jenis Kelamin", name: "jenisKelamin" },
                { label: "Alamat", name: "alamat" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-semibold">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Batal
              </button>
              <button
                onClick={handleSimpan}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 py-4 mt-8">
        <p className="text-center text-lg text-blue-600">Welcome to our website!</p>
        <p className="text-center text-sm text-white">copyright @timcapstone</p>
      </footer>
    </div>
  );
};

export default Profile;
