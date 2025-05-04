import React from "react";
import { FaStar } from "react-icons/fa";

const favorites = [
  {
    title: "Grojogan Sewu Tawangmangu",
    location: "Tawangmangu, Karanganyar",
    image: "/assets/ListWisata/grojogan.png",
  },
  {
    title: "Grojogan Sewu Tawangmangu",
    location: "Tawangmangu, Karanganyar",
    image: "/assets/ListWisata/grojogan.png",
  },

];

const Favorite = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFC] font-montserrat">
      <div className="flex justify-between items-center p-6">
        <img src="/assets/logo2.png" alt="Logo" className="h-20 drop-shadow-lg" />
        <div className="flex items-center gap-2 text-black font-semibold text-sm">
          <img src="/assets/icons/user-profile.png" alt="User" className="w-6 h-6 rounded" />
          <span className="font-bold">KENZABAR</span>
          <i className="fas fa-chevron-down text-xs text-black"></i>
        </div>
      </div>

      <div className="flex-grow">
        <h1 className="text-center text-4xl font-bold mb-6">Favorite</h1>

        <div className="space-y-4 px-4 md:px-16 pb-6">
          {favorites.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white rounded-xl shadow-md p-4 gap-4 border"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h2 className="text-lg font-extrabold">{item.title}</h2>
                <p className="italic text-gray-600">{item.location}</p>
              </div>
              <FaStar className="text-yellow-500 text-2xl border-2 border-yellow-500 rounded-full p-1" />
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-800 py-4">
        <p className="text-center text-lg text-blue-600">Welcome to our website!</p>
        <p className="text-center text-sm text-white">copyright @timcapstone</p>
      </footer>
    </div>
  );
};

export default Favorite;
