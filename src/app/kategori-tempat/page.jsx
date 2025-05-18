import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function KategoriPage() {
  const { nama } = useParams();
  const [hasilFilter, setHasilFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "wisata"));
        const allData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filtered = allData.filter((item) =>
          item.lokasi?.toLowerCase().includes(nama.toLowerCase())
        );

        setHasilFilter(filtered);
      } catch (error) {
        console.error("Gagal mengambil data wisata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nama]);

  if (loading) {
    return <p className="text-center mt-6">Memuat data kategori wisata...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">Wisata di {nama}</h1>
        {hasilFilter.length === 0 ? (
          <p className="text-gray-500">Tidak ada data wisata untuk kategori ini.</p>
        ) : (
          hasilFilter.map((item) => (
            <Link to={`/detail/${item.id}`} key={item.id} className="block">
              <div className="cursor-pointer bg-white p-4 shadow-md rounded-xl border border-black-300 flex gap-4 hover:bg-gray-50 transition">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-32 h-24 object-cover rounded"
                />
                <div>
                  <h2 className="text-xl font-bold">{item.nama}</h2>
                  <p className="text-sm text-gray-700 line-clamp-3">{item.deskripsi}</p>
                  <p className="text-sm font-semibold mt-2 text-green-700">Rp. {item.harga}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
