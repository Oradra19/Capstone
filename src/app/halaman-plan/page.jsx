import React from "react";
import { Link } from "react-router-dom";


const Plan = () => {
  const plans = [
    { id: 1, title: "Solo Explore", date: "23 Maret 2025" },
    { id: 2, title: "Alam", date: "30 Februari 2026" },
    { id: 3, title: "Religi", date: "22 Mei 2025" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFC] font-montserrat">
      <div className="flex justify-between items-center p-6">
        <img src="/assets/logo2.png" alt="Logo" className="h-20 drop-shadow-lg" />
        <div className="flex items-center gap-2 text-black font-semibold text-sm">
          <i className="fas fa-user-circle text-xl text-white"></i>
          <img src="/assets/icons/user-profile.png" alt="User" className="w-6 h-6 rounded" />
          <span className="font-bold">KENZABAR</span>
          <i className="fas fa-chevron-down text-xs text-black"></i>
        </div>
      </div>

      <div className="flex-grow px-8 py-6">
        <h1 className="text-center text-4xl font-bold mt-4">Plan</h1>
        <div className="flex flex-wrap justify-start gap-4 mt-8">
          {plans.map((plan, index) => (
            <Link
                key={plan.id}
                to={`/plan/${plan.id}`}  
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 w-full sm:w-60 h-40 hover:shadow-xl hover:border-black-500 transition-all duration-300"
            >
                <p className="text-sm text-gray-600 mb-2">Plan {index + 1}</p>
                <h2 className="text-2xl font-bold">{plan.title}</h2>
                <p className="italic mt-2 text-gray-500">{plan.date}</p>
            </Link>
          ))}
        </div>
      </div>

      <footer className="bg-gray-800 py-4 mt-8">
        <p className="text-center text-lg text-blue-600">Welcome to our website!</p>
        <p className="text-center text-sm text-white">copyright @timcapstone</p>
      </footer>
    </div>
  );
};

export default Plan;
