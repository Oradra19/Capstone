import Navbar from "../../components/navbar/navbar";
import Kategori from "../../components/kategori";
import BannerPromo from "../../components/banner";
import WisataList from "../../components/listwisata";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import LoginModal from "../../components/LoginModal";
import RegisterModal from "../../components/RegisterModal";

const HalamanUtama = ({ user }) => {
  const [destinasi, setDestinasi] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

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

  useEffect(() => {
    if (location.state?.openLogin) {
      setShowLoginModal(true);
      navigate(".", { replace: true });
    }
    if (location.state?.openRegister) {
      setShowRegisterModal(true);
      navigate(".", { replace: true });
    }
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen bg-[#F9FAFC]">
      <Navbar user={user} />
      <div className="mt-4">
        <Kategori />
        <BannerPromo />
        <WisataList destinasi={destinasi} />
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}

      <footer className="bg-gray-800 py-4 mt-8">
        <p className="text-center text-lg text-blue-600 mt-4 mb-2">
          Welcome to our website!
        </p>
        <p className="text-center text-sm text-white">copyright @timcapstone</p>
      </footer>
    </div>
  );
};

export default HalamanUtama;
