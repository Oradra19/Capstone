import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import ProfileDropdown from "../../components/navbar/profiledropdown";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Fungsi ambil data favorit dari Firestore
  const fetchFavorites = async (uid) => {
    const favoritesRef = collection(db, "users", uid, "favorites");
    const snapshot = await getDocs(favoritesRef);
    const favData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFavorites(favData);
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        await fetchFavorites(user.uid);
      } else {
        setUserId(null);
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleClick = (id) => {
    navigate(`/detail/${id}`);
  };

  // Fungsi hapus favorit
  const handleDelete = async (favId) => {
    if (!userId) return;

    try {
      await deleteDoc(doc(db, "users", userId, "favorites", favId));
      // Setelah hapus, refresh list favorit
      fetchFavorites(userId);
      alert("Destinasi favorit berhasil dihapus.");
    } catch (error) {
      console.error("Gagal menghapus favorit:", error);
      alert("Gagal menghapus favorit.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFC] font-montserrat">
      <ProfileDropdown />

      <div className="flex-grow">
        <h1 className="text-center text-2xl md:text-4xl font-bold mb-6">Favorite</h1>

        <div className="space-y-4 px-4 md:px-16 pb-6 max-w-5xl mx-auto">
          {favorites.length === 0 ? (
            <p className="text-center text-gray-500">
              {userId ? "Belum ada destinasi favorit." : "Silakan login untuk melihat favorit."}
            </p>
          ) : (
            favorites.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white rounded-xl shadow-md p-4 gap-4 border hover:bg-gray-100"
              >
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-24 h-20 object-cover rounded-md cursor-pointer"
                  onClick={() => handleClick(item.wisataId || item.id)} // pake wisataId biar arah ke detail
                />
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => handleClick(item.wisataId || item.id)}
                >
                  <h2 className="text-lg font-extrabold">{item.nama}</h2>
                  <p className="italic text-gray-600">{item.lokasi}</p>
                </div>
                <FaStar className="text-yellow-500 text-xl md:text-2xl border-2 border-yellow-500 rounded-full p-1 flex-shrink-0" />


                <button
                  onClick={() => handleDelete(item.id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Hapus
                </button>
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
