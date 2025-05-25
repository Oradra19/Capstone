import React, { useState, useEffect } from "react";

const ModalForm = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nama: initialData.nama || "",
        email: initialData.email || "",
        role: initialData.role || "user",
      });
    } else {
      setFormData({
        nama: "",
        email: "",
        role: "user",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!formData.nama.trim()) {
      alert("Nama harus diisi!");
      return;
    }
    if (!formData.email.trim()) {
      alert("Email harus diisi!");
      return;
    }
    // Email sederhana cek format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Email tidak valid!");
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit User" : "Tambah User"}
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Nama lengkap"
            className="w-full p-2 border mb-4 rounded"
          />

          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="w-full p-2 border mb-4 rounded"
          />

          <label className="block mb-2 font-semibold">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border mb-6 rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                setFormData({ nama: "", email: "", role: "user" });
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
