import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDocs, getDoc } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthContext"; // pastikan kamu punya context Auth

export default function DetailWisata() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // gunakan context untuk cek login
  const [wisata, setWisata] = useState(null);

  useEffect(() => {
    const fetchWisata = async () => {
      try {
        const docRef = doc(db, "wisata", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setWisata({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("Wisata tidak ditemukan.");
        }
      } catch (error) {
        console.error("Gagal mengambil data wisata:", error);
      }
    };

    fetchWisata();
  }, [id]);

  const tambahKeFavoriteFirestore = async (destinasi) => {
    if (!user) {
      alert("Silakan login terlebih dahulu.");
      navigate("/login");
      return;
    }

    try {
      const favRef = collection(db, "users", user.uid, "favorites");

      // Ambil semua dokumen favorites untuk user ini
      const snapshot = await getDocs(favRef);

      // Cek apakah ada dokumen yang punya wisataId sama dengan destinasi.id
      const alreadyFavorited = snapshot.docs.some(
        (doc) => doc.data().wisataId === destinasi.id
      );

      if (alreadyFavorited) {
        alert("Destinasi sudah ada di Favorite!");
        return;
      }

      // Jika belum ada, tambahkan ke favorites
      await addDoc(favRef, {
        nama: destinasi.nama,
        lokasi: destinasi.lokasi,
        deskripsi: destinasi.deskripsi,
        harga: destinasi.harga,
        rating: destinasi.rating,
        gambar: destinasi.gambar,
        gmaps: destinasi.gmaps,
        wisataId: destinasi.id,
        timestamp: Date.now(),
      });

      alert("Destinasi berhasil ditambahkan ke Favorite!");
    } catch (error) {
      console.error("Gagal menambahkan ke Favorite:", error);
      alert("Terjadi kesalahan saat menambahkan ke Favorite.");
    }
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const totalStars = 5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half">☆</span>);
    }

    const remaining = totalStars - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(<span key={`empty-${i}`}>✩</span>);
    }

    return stars;
  };

  if (!wisata)
    return <p className="text-center mt-10">Memuat data wisata...</p>;

  return (
    <>
      <div className="min-h-screen bg-[#F9FAFC] py-10 px-4">
        <div className="absolute top-6 left-4 z-50">
          <img
            src="/assets/logo2.png"
            alt="logo"
            className="h-16 drop-shadow-lg"
          />
        </div>

        <div className="max-w-5xl w-full mx-auto bg-[#E9E9E9] border border-gray-300 shadow-lg rounded-xl p-4 sm:p-6 space-y-6 mt-20">
          <img
            src={wisata.gambar}
            alt={wisata.nama}
            className="w-full h-60 sm:h-72 md:h-80 object-cover rounded-xl shadow"
          />

          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {wisata.nama}
            </h1>
            <p className="text-gray-600">📍 {wisata.lokasi}</p>
            <p className="text-gray-700 leading-relaxed text-justify">
              {wisata.deskripsi}
            </p>
            <p className="text-lg font-semibold text-green-700">
              🎟️ Harga tiket: Rp {wisata.harga.toLocaleString("id-ID")}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-xl">
                {renderRatingStars(wisata.rating)}
              </span>
              <span className="text-gray-700 text-sm font-medium">
                ({wisata.rating})
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => navigate("/buat-plan", { state: { wisata } })}
            >
              Buat Plan
            </button>

            <button
              className="w-full sm:w-auto px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              onClick={() => tambahKeFavoriteFirestore(wisata)}
            >
              Tambah ke Favorite
            </button>
          </div>

          <div className="mt-6">
            <a
              href={wisata.gmaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-600 transition"
            >
              Buka di Google Maps
            </a>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 py-4 mt-8">
        <p className="text-center text-lg text-blue-600 mt-8 mb-4">
          Welcome to our website!
        </p>
        <p className="text-center text-sm text-white">copyright @timcapstone</p>
      </footer>
    </>
  );
}
