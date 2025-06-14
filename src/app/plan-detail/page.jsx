import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ProfileDropdown from "../../components/navbar/profiledropdown";

const DetailPlan = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      if (!user || !id) return;

      try {
        const planRef = doc(db, `users/${user.uid}/plans/${id}`);
        const planSnap = await getDoc(planRef);

        if (planSnap.exists()) {
          setPlan({ id: planSnap.id, ...planSnap.data() });
        } else {
          console.log("Plan tidak ditemukan di Firebase.");
        }
      } catch (error) {
        console.error("Gagal mengambil detail plan:", error);
      }
    };

    fetchPlan();
  }, [user, id]);

  const handleDownloadPDF = () => {
    if (!plan) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Rencana Wisata: ${plan.name}`, 14, 20);

    if (plan.date) {
      const formattedDate = new Date(plan.date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      doc.setFontSize(12);
      doc.text(`Tanggal Plan: ${formattedDate}`, 14, 28);
    }

    const tableHeaders = ["No", "Nama", "Link Google Maps"];
    const tableBody = plan.destinations.map((dest, index) => [
      index + 1,
      dest.nama,
      dest.gmaps, 
    ]);

    autoTable(doc, {
      startY: plan.date ? 36 : 30,
      head: [tableHeaders],
      body: tableBody,
      styles: { fontSize: 10 },
    });

    doc.save(`${plan.name}.pdf`);
  };

  if (!plan) return <p className="text-center mt-10">Plan tidak ditemukan</p>;

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFC] font-montserrat">
      <ProfileDropdown />

      <div className="flex-grow px-4 sm:px-8 py-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mt-4 mb-4 tracking-wide">
          Detail Plan
        </h1>

        <div className="bg-[#E9E9E9] p-4 sm:p-6 rounded-xl shadow-md max-w-[1200px] mx-auto w-full mt-2">
          <h2 className="italic text-lg sm:text-xl font-semibold mb-6">
            Plan: {plan.name}
            <p className="text-sm italic mb-4">
              Tanggal dibuat:{" "}
              {plan.date &&
                new Date(plan.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
            </p>
          </h2>

          {plan.destinations && plan.destinations.length > 0 ? (
            <>
              {plan.destinations.map((dest, index) => (
                <div key={index} className="mb-6">
                  <h3 className="font-bold mb-2">Destinasi {index + 1}</h3>
                  <div className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-xl shadow-md gap-4">
                    <img
                      src={dest.gambar}
                      alt={dest.nama}
                      className="w-full sm:w-32 h-40 sm:h-20 object-cover rounded-lg"
                    />
                    <div className="text-center sm:text-left flex-1">
                      <h4 className="text-xl font-bold">{dest.nama}</h4>
                      <p className="italic">{dest.lokasi}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-center mt-6">
                <button
                  onClick={handleDownloadPDF}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow"
                >
                  Download PDF
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Tidak ada destinasi dalam plan ini.</p>
          )}
        </div>
      </div>

      <footer className="bg-gray-800 py-4">
        <p className="text-center text-lg text-blue-600">
          Welcome to our website!
        </p>
        <p className="text-center text-sm text-white">copyright @timcapstone</p>
      </footer>
    </div>
  );
};

export default DetailPlan;
