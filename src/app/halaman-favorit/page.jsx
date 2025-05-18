import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // pastikan ini adalah instance Firestore-mu
import ProfileDropdown from "../../components/navbar/profiledropdown";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const favoritesRef = collection(db, "users", user.uid, "favorites");
        const snapshot = await getDocs(favoritesRef);
        const favData = snapshot.docs.map(doc => doc.data());
        setFavorites(favData);
      } else {
        setUserId(null);
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleClick = (id) => {
    navigate(`/detailwisata/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFC] font-montserrat">
      <ProfileDropdown />

      <div className="flex-grow">
        <h1 className="text-center text-4xl font-bold mb-6">Favorite</h1>

        <div className="space-y-4 px-4 md:px-16 pb-6">
          {favorites.length === 0 ? (
            <p className="text-center text-gray-500">
              {userId ? "Belum ada destinasi favorit." : "Silakan login untuk melihat favorit."}
            </p>
          ) : (
            favorites.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(item.id)}
                className="flex items-center bg-white rounded-xl shadow-md p-4 gap-4 border cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-24 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-extrabold">{item.nama}</h2>
                  <p className="italic text-gray-600">{item.lokasi}</p>
                </div>
                <FaStar className="text-yellow-500 text-2xl border-2 border-yellow-500 rounded-full p-1" />
              </div>
            ))
          )}
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
