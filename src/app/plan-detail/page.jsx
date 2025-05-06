import React from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import ProfileDropdown from "../../components/navbar/profiledropdown";

const DetailPlan = () => {
  
  const { id } = useParams();
  
  
  const plans = JSON.parse(localStorage.getItem("customPlans")) || [];
  const plan = plans.find((p) => p.planId === `Plan ${id}`);

  if (!plan) return <p className="text-center mt-10">Plan tidak ditemukan</p>;

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFC] font-montserrat">
      <ProfileDropdown />

      <div className="flex-grow p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mt-4 mb-4 tracking-wide">
          Detail Plan
        </h1>
        <div className="bg-[#E9E9E9] p-6 rounded-xl shadow-md max-w-[1500px] mx-auto w-full mt-2">
          <h2 className="italic text-xl font-semibold mb-6">{plan.planId}: {plan.name}</h2>

          {plan.destinations.map((dest, index) => (
            <div key={index} className="mb-6 max-w-[14000px] mx-auto">
              <h3 className="font-bold mb-2">
                Destinasi {index + 1}
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
