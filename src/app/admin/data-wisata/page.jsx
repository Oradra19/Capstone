import React, { useState } from "react";
import Sidebar from "../../../components/admin/sidebar";
import Header from "../../../components/admin/header";
import Footer from "../../../components/admin/footer";
import ModalForm from "../../../components/admin/modalform";
import DataTable from "../../../components/admin/datatable";


const initialData = [
  {
    id: 1,
    nama: "Air Terjun Grojogan Sewu",
    rating: "5.0",
    lokasi: "Karanganyar",
    deskripsi: "Tempat wisata paling hits...",
    harga: 0,
    foto: "/assets/grojogan.jpg",
  },
  {
    id: 2,
    nama: "Candi Prambanan",
    rating: "5.0",
    lokasi: "Klaten",
    harga: 0,
    deskripsi: "Candi bercorak Hindu terbesar...",
    foto: "/assets/prambanan.jpg",
  },
  {
    id: 1,
    nama: "Air Terjun Grojogan Sewu",
    rating: "5.0",
    lokasi: "Karanganyar",
    deskripsi: "Tempat wisata paling hits...",
    harga: 0,
    foto: "/assets/grojogan.jpg",
  },
  {
    id: 2,
    nama: "Candi Prambanan",
    rating: "5.0",
    lokasi: "Klaten",
    harga: 0,
    deskripsi: "Candi bercorak Hindu terbesar...",
    foto: "/assets/prambanan.jpg",
  },
  {
    id: 1,
    nama: "Air Terjun Grojogan Sewu",
    rating: "5.0",
    lokasi: "Karanganyar",
    deskripsi: "Tempat wisata paling hits...",
    harga: 0,
    foto: "/assets/grojogan.jpg",
  },
  {
    id: 2,
    nama: "Candi Prambanan",
    rating: "5.0",
    lokasi: "Klaten",
    harga: 0,
    deskripsi: "Candi bercorak Hindu terbesar...",
    foto: "/assets/prambanan.jpg",
  },
  {
    id: 1,
    nama: "Air Terjun Grojogan Sewu",
    rating: "5.0",
    lokasi: "Karanganyar",
    deskripsi: "Tempat wisata paling hits...",
    harga: 0,
    foto: "/assets/grojogan.jpg",
  },
  {
    id: 2,
    nama: "Candi Prambanan",
    rating: "5.0",
    lokasi: "Klaten",
    harga: 0,
    deskripsi: "Candi bercorak Hindu terbesar...",
    foto: "/assets/prambanan.jpg",
  },
];

const DashboardDestinasi = () => {
  const [data, setData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = (item) => {
    setModalOpen(true); 
  };

  const handleDelete = (id) => {
    setData(data.filter((d) => d.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
        <Sidebar />
      <main className="flex-1 bg-[#F5F7FA] p-6 ml-64 pb-20">
        <Header title="Data Destinasi Wisata" />
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex justify-between mb-4">
            <div>Show <select className="border rounded px-2 py-1 mx-2"><option>10</option></select> entries</div>
            <button onClick={() => setModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded font-semibold">
              + tambah data
            </button>
          </div>
          <DataTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <Footer />
      </main>
      <ModalForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default DashboardDestinasi;
