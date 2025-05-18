import Navbar from "../../components/navbar/navbar";
import Kategori from "../../components/kategori";
import BannerPromo from "../../components/banner";
import WisataList from "../../components/listwisata";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const HalamanUtama = ({ user }) => {
  const [destinasi, setDestinasi] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "wisata"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDestinasi(data);
      } catch (error) {
        console.error("Gagal mengambil data wisata:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFC]">
      <Navbar user={user} />
      <div className="mt-4">
        <Kategori />
        <BannerPromo />
        <WisataList destinasi={destinasi} />
      </div>
      <footer className="bg-gray-800 py-4 mt-8">
        <p className="text-center text-lg text-blue-600 mt-4 mb-2">Welcome to our website!</p>
        <p className="text-center text-sm text-white">copyright @timcapstone</p>
      </footer>
    </div>
  );
};

export default HalamanUtama;
