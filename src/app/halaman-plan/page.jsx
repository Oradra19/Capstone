import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "../../components/navbar/profiledropdown";

const Plan = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const savedPlans = JSON.parse(localStorage.getItem("customPlans")) || [];
    setPlans(savedPlans);
  }, []);

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

      <div className="flex-grow px-8 py-6">
        <h1 className="text-center text-4xl font-bold mt-4">Plan</h1>

        {plans.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">
            Belum ada plan yang disimpan.
          </p>
        ) : (
          <div className="flex flex-wrap justify-start gap-4 mt-8">
            {plans.map((plan, index) => (
              <Link
                key={index}
                to={`/plan/${index + 1}`}
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 w-full sm:w-60 h-40 hover:shadow-xl hover:border-black-500 transition-all duration-300"
              >
                <p className="text-sm text-gray-600 mb-2">{plan.planId}</p>
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <p className="italic mt-2 text-gray-500">{formatTanggal(plan.date)}</p> {/* Tanggal diformat */}
              </Link>
            ))}
          </div>
        )}
      </div>

      <footer className="bg-gray-800 py-4 mt-8">
        <p className="text-center text-lg text-blue-600">
          Welcome to our website!
        </p>
        <p className="text-center text-sm text-white">
          copyright @timcapstone
        </p>
      </footer>
    </div>
  );
};

export default Plan;
