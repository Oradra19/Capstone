import React, { useState, useEffect } from "react";

const ModalForm = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    foto: "",
    rating: "",
    nama: "",
    deskripsi: "",
    harga: "",
    gmaps: "",
    lokasi: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        foto: initialData.foto || "",
        rating: initialData.rating || "",
        nama: initialData.nama || "",
        deskripsi: initialData.deskripsi || "",
        harga: initialData.harga || "",
        gmaps: initialData.gmaps || "",
        lokasi: initialData.lokasi || "",
      });
      setPreviewImage(initialData.foto || "");
    } else {
      setFormData({
        foto: "",
        rating: "",
        nama: "",
        deskripsi: "",
        harga: "",
        gmaps: "",
        lokasi: "",
      });
      setPreviewImage("");
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "rating" || name === "harga") && value !== "") {
      if (!/^\d*\.?\d*$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setFormData((prev) => ({ ...prev, foto: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nama.trim()) {
      alert("Nama wisata harus diisi!");
      return;
    }
    if (!formData.gmaps.trim()) {
      alert("Link Gmaps harus diisi!");
      return;
    }

    onSubmit(formData);

    setFormData({
      foto: "",
      rating: "",
      nama: "",
      deskripsi: "",
      harga: "",
      gmaps: "",
      lokasi: "",
    });
    setPreviewImage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Data Wisata" : "Tambah Data Wisata"}
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold">Foto</label>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-32 object-cover mb-2 rounded"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          <label className="block mb-2 font-semibold">Rating (0-5)</label>
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Contoh: 4.5"
            className="w-full p-2 border mb-4 rounded"
            maxLength={3}
          />
          <label className="block mb-2 font-semibold">Nama Wisata</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Nama destinasi wisata"
            className="w-full p-2 border mb-4 rounded"
          />
          <label className="block mb-2 font-semibold">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            placeholder="Deskripsi singkat"
            className="w-full p-2 border mb-4 rounded"
            rows={3}
          />
          <label className="block mb-2 font-semibold">Harga (angka)</label>
          <input
            type="text"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            placeholder="Harga tiket masuk"
            className="w-full p-2 border mb-4 rounded"
          />
          <label className="block mb-2 font-semibold">Link Gmaps</label>
          <input
            type="url"
            name="gmaps"
            value={formData.gmaps}
            onChange={handleChange}
            placeholder="https://maps.google.com/..."
            className="w-full p-2 border mb-4 rounded"
          />
          <label className="block mb-2 font-semibold">Lokasi</label>
          <input
            type="text"
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            placeholder="Contoh: Karanganyar"
            className="w-full p-2 border mb-6 rounded"
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                setFormData({
                  foto: "",
                  rating: "",
                  nama: "",
                  deskripsi: "",
                  harga: "",
                  gmaps: "",
                  lokasi: "",
                });
                setPreviewImage("");
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
