import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../../firebase/firebase";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false); // modal baru
  const [newPassword, setNewPassword] = useState("");

  const [profileImage, setProfileImage] = useState("/assets/icons/user-profil2.png");

  const [profile, setProfile] = useState({
    namaTampilan: "",
    username: "",
    email: "",
    namaLengkap: "",
    tanggalLahir: "",
    jenisKelamin: "",
    alamat: "",
    profileImageUrl: "", // simpan URL foto profil dari db
  });

  const [formData, setFormData] = useState(profile);
  const [currentUser, setCurrentUser] = useState(null);

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.exists() ? docSnap.data() : {};

        setProfile((prev) => ({
          ...prev,
          ...userData,
          email: user.email || "",
          username: user.displayName || userData.username || "",
          profileImageUrl: userData.profileImageUrl || "/assets/icons/user-profil2.png",
        }));

        setProfileImage(userData.profileImageUrl || "/assets/icons/user-profil2.png");
      }
    });
    return () => unsubscribe();
  }, []);

  const openModal = () => {
    setFormData(profile);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSimpan = async () => {
    if (!currentUser) return;
    try {
      await setDoc(doc(db, "users", currentUser.uid), formData, { merge: true });
      setProfile(formData);
      setShowModal(false);
      alert("Profil berhasil disimpan!");
    } catch (error) {
      console.error("Gagal menyimpan profil:", error);
      alert("Terjadi kesalahan saat menyimpan profil.");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Buat URL sementara untuk preview
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);

      // Simpan foto profil ke Firestore (di sini simpan URL lokal sebagai contoh, idealnya ke Storage)
      // Kamu bisa tambahkan upload ke Firebase Storage di sini jika ingin permanen

      // Simpan URL ke Firestore (misal pakai base64 atau upload Storage dulu)
      // Sekarang contoh hanya simpan nama file saja supaya gampang
      // Untuk demo, simpan URL sementara saja:
      try {
        await setDoc(
          doc(db, "users", currentUser.uid),
          { profileImageUrl: imageUrl },
          { merge: true }
        );
        setProfile((prev) => ({ ...prev, profileImageUrl: imageUrl }));
        alert("Foto profil berhasil diubah!");
        setShowImageOptions(false);
      } catch (error) {
        console.error("Gagal menyimpan foto profil:", error);
        alert("Gagal menyimpan foto profil.");
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      setProfileImage("/assets/icons/user-profil2.png");
      await setDoc(
        doc(db, "users", currentUser.uid),
        { profileImageUrl: "" },
        { merge: true }
      );
      setProfile((prev) => ({ ...prev, profileImageUrl: "" }));
      setShowImageOptions(false);
      alert("Foto profil berhasil dihapus.");
    } catch (error) {
      console.error("Gagal menghapus foto profil:", error);
      alert("Gagal menghapus foto profil.");
    }
  };

  // Fungsi untuk ubah password di modal baru
  const handleChangePassword = async () => {
    if (!currentUser) return;
    if (newPassword.length < 6) {
      alert("Password harus minimal 6 karakter.");
      return;
    }
    try {
      await updatePassword(currentUser, newPassword);
      alert("Password berhasil diubah!");
      setNewPassword("");
      setShowPasswordModal(false);
    } catch (error) {
      console.error("Gagal mengubah password:", error);
      alert("Gagal mengubah password. Pastikan kamu login ulang jika sesi sudah lama.");
    }
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
                src={profileImage}
                alt="User"
                className="w-28 h-28 rounded-full border-4 shadow-lg transition-all transform hover:scale-110"
              />
              <button
                type="button"
                onClick={() => setShowImageOptions(!showImageOptions)}
                className="absolute bottom-0 right-0 bg-[#d3dd60] p-1 rounded-full"
              >
                <img
                  src="/assets/icons/edit.png"
                  alt="edit"
                  className="w-5 h-5"
                />
              </button>

              {showImageOptions && (
                <div className="absolute top-full right-0 mt-2 bg-white border shadow rounded w-40 z-10">
                  <label className="block px-4 py-2 cursor-pointer hover:bg-gray-100">
                    Ganti Foto
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={handleDeleteImage}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Hapus Foto
                  </button>
                </div>
              )}
            </div>

            <h2 className="text-3xl font-semibold text-gray-800">
              {profile.namaTampilan || "Nama belum diatur"}
            </h2>
            <p className="text-gray-500 italic">{profile.email || "Email belum tersedia"}</p>
          </div>

          <div className="mt-6 w-full space-y-4 text-sm text-gray-800">
            <div className="flex justify-between">
              <span className="font-semibold w-40 inline-block">Nama Lengkap:</span>
              <span>{profile.namaLengkap || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold w-40 inline-block">Tanggal Lahir:</span>
              <span>{profile.tanggalLahir || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold w-40 inline-block">Jenis Kelamin:</span>
              <span>{profile.jenisKelamin || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold w-40 inline-block">Alamat:</span>
              <span>{profile.alamat || "-"}</span>
            </div>
          </div>

          {/* Layout tombol edit dan ubah password */}
          <div className="mt-6 flex justify-between items-center gap-4">
            <button
              onClick={openModal}
              className="font-bold text-black px-4 py-2 rounded-full hover:bg-[#d3dd60] transition-all flex gap-2 items-center"
            >
              <img src="/assets/icons/edit.png" alt="edit" className="w-6 h-6" />
              Edit Profile
            </button>

            <button
              onClick={() => setShowPasswordModal(true)}
              className="font-bold text-white px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-all"
            >
              Ubah Password
            </button>
          </div>
        </div>
      </div>

      {/* Modal Edit Profile */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              {[
                { label: "Nama Tampilan", name: "namaTampilan" },
                { label: "Username", name: "username", disabled: true },
                { label: "Email", name: "email", disabled: true },
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
                    disabled={field.disabled}
                    className="w-full border rounded px-3 py-2 bg-white disabled:bg-gray-100"
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

      {/* Modal Ubah Password */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Ubah Password</h2>
            <input
              type="password"
              placeholder="Masukkan password baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setNewPassword("");
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Batal
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 py-4 mt-8">
        <p className="text-center text-lg text-blue-600">Welcome to our website!</p>
        <p className="text-center text-sm text-white">copyright @timcapstone</p>
      </footer>
    </div>
  );
};

export default Profile;
