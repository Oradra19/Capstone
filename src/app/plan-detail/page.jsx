import React from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const dataPlans = [
  {
    id: 1,
    title: "Solo Explore",
    destinasi: [
      {
        nama: "Tumurun Private Museum",
        lokasi: "Solo, Jawa Tengah",
        image: "/assets/detailwisata/tumurun.png",
      },
      {
        nama: "Solo Safari",
        lokasi: "Solo, Jawa Tengah",
        image: "/assets/ListWisata/safari.png",
      },
    ],
  },
  {
    id: 2,
    title: "Alam",
    destinasi: [
      {
        nama: "Embung Manajar",
        lokasi: "Selo, Boyolali",
        image: "/assets/detailwisata/embung.png",
      },
      {
        nama: "Gunung Sepikul",
        lokasi: "Bulu, Sukoharjo",
        image: "/assets/detailwisata/sepikul.png",
      },
    ],
  },
  {
    id: 3,
    title: "Religi",
    destinasi: [
      {
        nama: "Masjid Raya Sheikh Zayed",
        lokasi: "Solo, Jawa Tengah",
        image: "/assets/ListWisata/zayed.png",
      },
      {
        nama: "Candi Prambanan",
        lokasi: "Prambanan, Yogyakarta",
        image: "/assets/detailwisata/candi.png",
      },
    ],
  },
];

const DetailPlan = () => {
  const { id } = useParams();
  const plan = dataPlans.find((p) => p.id === parseInt(id));

  if (!plan) return <p className="text-center mt-10">Plan tidak ditemukan</p>;

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFC] font-montserrat">
      <div className="flex justify-between items-center p-6">
        <img
          src="/assets/logo2.png"
          alt="Logo"
          className="h-20 drop-shadow-lg"
        />
        <div className="flex items-center gap-2 text-black font-semibold text-sm">
          <img
            src="/assets/icons/user-profile.png"
            alt="User"
            className="w-6 h-6 rounded"
          />
          <span className="font-bold">KENZABAR</span>
          <i className="fas fa-chevron-down text-xs text-black"></i>
        </div>
      </div>

      <div className="flex-grow p-6">
        <div className="bg-[#E9E9E9] p-6 rounded-xl shadow-md max-w-[1500px] mx-auto w-full">
          <h2 className="italic text-xl font-semibold mb-6">Plan {plan.id}</h2>

          {plan.destinasi.map((dest, index) => (
            <div key={index} className="mb-6 max-w-[14000px] mx-auto">
              <h3 className="font-bold mb-2">
                Destinasi {index === 0 ? "Pertama" : "Kedua"}
              </h3>
              <div className="flex items-center bg-white p-4 rounded-xl shadow-md ">
                <img
                  src={dest.image}
                  alt={dest.nama}
                  className="w-32 h-20 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h4 className="text-xl font-bold">{dest.nama}</h4>
                  <p className="italic">{dest.lokasi}</p>
                </div>
                <FaStar className="text-yellow-500 text-2xl border-2 border-yellow-500 rounded-full p-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
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
