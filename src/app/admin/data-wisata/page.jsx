import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import Sidebar from "../../../components/admin/sidebar";
import Header from "../../../components/admin/header";
import Footer from "../../../components/admin/footer";
import DataTable from "../../../components/admin/datatable";
import FormTambahDestinasi from "../../../components/formwisatainput";

const DashboardDestinasi = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "wisata"), (snapshot) => {
      const wisataData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(wisataData);
      setFilteredData(wisataData); // default tampilan semua
    });

    return () => unsubscribe();
  }, []);

  // Filter berdasarkan nama
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus destinasi ini?")) {
      await deleteDoc(doc(db, "wisata", id));
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      <Sidebar />
      <main className="flex-1 bg-[#F5F7FA] p-6 ml-64 pb-20">
        <Header title="Data Destinasi Wisata" />
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex justify-between mb-4">
            <div>
              <input
                type="text"
                placeholder="Cari nama destinasi..."
                className="border px-3 py-1 rounded mr-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              Show{" "}
              <select className="border rounded px-2 py-1 mx-2">
                <option>10</option>
              </select>{" "}
              entries
            </div>
            <button
              onClick={() => {
                setModalOpen(true);
                setEditItem(null); // tambah data
              }}
              className="bg-green-500 text-white px-4 py-2 rounded font-semibold"
            >
              + tambah data
            </button>
          </div>
          <DataTable
            data={filteredData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
        <Footer />
      </main>

      {/* Modal Tambah/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white w-[90%] max-w-2xl rounded-lg overflow-auto max-h-[90vh] p-6 relative">
            <button
              onClick={() => {
                setModalOpen(false);
                setEditItem(null);
              }}
              className="absolute top-2 right-2 text-red-500 font-bold text-xl"
            >
              &times;
            </button>
            <FormTambahDestinasi
              editData={editItem}
              onSuccess={() => {
                setModalOpen(false);
                setEditItem(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardDestinasi;
