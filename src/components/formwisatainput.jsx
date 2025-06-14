import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

const FormTambahDestinasi = ({ editData, onSuccess }) => {
  const [form, setForm] = useState({
    nama: "",
    lokasi: "",
    deskripsi: "",
    harga: "",
    rating: "",
    gmaps: "",
  });
  const [gambar, setGambar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        nama: editData.nama || "",
        lokasi: editData.lokasi || "",
        deskripsi: editData.deskripsi || "",
        harga: editData.harga || "",
        rating: editData.rating || "",
        gmaps: editData.gmaps || "",
      });
      setGambar(null); 
    } else {
      setForm({
        nama: "",
        lokasi: "",
        deskripsi: "",
        harga: "",
        rating: "",
        gmaps: "",
      });
      setGambar(null);
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setGambar(e.target.files[0]);
  };

  const uploadImageToCloudinary = async () => {
    if (!gambar) return null; 

    const formData = new FormData();
    formData.append("file", gambar);
    formData.append("upload_preset", "wisata_unsigned");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dss5hxv5x/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (!data.secure_url) {
      console.error("Upload ke Cloudinary gagal:", data);
      throw new Error("Upload ke Cloudinary gagal");
    }
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editData && !gambar) {
      return alert("Silakan upload gambar!");
    }

    try {
      setLoading(true);
      const imageUrl = gambar ? await uploadImageToCloudinary() : editData?.gambar;

      if (editData) {
        // update data
        const docRef = doc(db, "wisata", editData.id);
        await updateDoc(docRef, {
          ...form,
          gambar: imageUrl,
          updatedAt: serverTimestamp(),
        });
        alert("Destinasi berhasil diperbarui!");
      } else {
        await addDoc(collection(db, "wisata"), {
          ...form,
          gambar: imageUrl,
          createdAt: serverTimestamp(),
        });
        alert("Destinasi berhasil ditambahkan!");
      }

      setForm({
        nama: "",
        lokasi: "",
        deskripsi: "",
        harga: "",
        rating: "",
        gmaps: "",
      });
      setGambar(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Gagal submit destinasi:", err);
      alert("Gagal submit destinasi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 font-montserrat">
      <h2 className="text-2xl font-bold mb-4">
        {editData ? "Edit Destinasi Wisata" : "Tambah Destinasi Wisata"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nama"
          type="text"
          value={form.nama}
          onChange={handleChange}
          placeholder="Nama Wisata"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="lokasi"
          type="text"
          value={form.lokasi}
          onChange={handleChange}
          placeholder="Lokasi"
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          placeholder="Deskripsi"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="harga"
          type="number"
          value={form.harga}
          onChange={handleChange}
          placeholder="Harga (Rp)"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="rating"
          type="number"
          step="0.1"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating (1-5)"
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="gmaps"
          type="text"
          value={form.gmaps}
          onChange={handleChange}
          placeholder="Link Google Maps"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={editData ? "" : "required"}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          {loading
            ? "Mengunggah..."
            : editData
            ? "Simpan Perubahan"
            : "Tambah Destinasi"}
        </button>
      </form>
    </div>
  );
};

export default FormTambahDestinasi;
