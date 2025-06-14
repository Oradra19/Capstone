import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "../../components/navbar/profiledropdown";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { FiPlus, FiTrash2 } from "react-icons/fi"; 

const Plan = () => {
  const [plans, setPlans] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      if (!user) return;

      try {
        const userPlansRef = collection(db, `users/${user.uid}/plans`);
        const querySnapshot = await getDocs(userPlansRef);
        const fetchedPlans = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlans(fetchedPlans);
      } catch (error) {
        console.error("Gagal mengambil plan:", error);
      }
    };

    fetchPlans();
  }, [user]);

  const handleDelete = async (planId) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus plan ini?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, `users/${user.uid}/plans/${planId}`));
      setPlans((prev) => prev.filter((plan) => plan.id !== planId));
    } catch (error) {
      console.error("Gagal menghapus plan:", error);
    }
  };

  const formatTanggal = (tanggalString) => {
    return new Date(tanggalString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFC] font-montserrat">
      <ProfileDropdown />

      <h1 className="text-center text-4xl font-bold mt-4">Plan</h1>

      <div className="flex-grow px-4 sm:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <button
            onClick={() => navigate("/buat-plan")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all"
          >
            <FiPlus className="text-lg" />
            Tambah Plan
          </button>
        </div>

        {plans.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">
            Belum ada plan yang disimpan.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className="relative bg-white border border-gray-200 rounded-2xl shadow-md p-4 hover:shadow-xl hover:border-gray-400 transition-all duration-300"
              >
                <Link to={`/plan/${plan.id}`}>
                  <p className="text-sm text-gray-600 mb-2">#{index + 1}</p>
                  <h2 className="text-2xl font-bold">{plan.name}</h2>
                  <p className="italic mt-2 text-gray-500">
                    {formatTanggal(plan.date)}
                  </p>
                </Link>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  title="Hapus"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="bg-gray-800 py-4 mt-8">
        <p className="text-center text-lg text-blue-600">
          Welcome to our website!
        </p>
        <p className="text-center text-sm text-white">copyright @timcapstone</p>
      </footer>
    </div>
  );
};

export default Plan;
