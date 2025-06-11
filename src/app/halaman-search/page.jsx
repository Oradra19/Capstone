import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get("query")?.toLowerCase() || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWisata = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "wisata"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filtered = data.filter(
          (item) =>
            item.nama.toLowerCase().includes(query) ||
            item.deskripsi.toLowerCase().includes(query)
        );

        setResults(filtered);
      } catch (error) {
        console.error("Gagal mengambil data wisata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWisata();
  }, [query]);

  if (loading) {
    return <p className="text-center mt-6">Memuat hasil pencarian...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        Hasil Pencarian: "{query}"
      </h2>
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((item) => (
            <Link to={`/detail/${item.id}`} key={item.id} className="block">
              <div className="cursor-pointer bg-white p-4 sm:p-5 shadow-md rounded-xl border border-gray-200 flex flex-col sm:flex-row gap-4 hover:bg-gray-50 transition">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-full sm:w-32 h-40 sm:h-24 object-cover rounded"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-bold">{item.nama}</h3>
                  <p className="text-gray-700 text-sm sm:text-base line-clamp-3 mt-1">
                    {item.deskripsi}
                  </p>
                  <p className="text-green-600 font-medium mt-2">Rp{item.harga}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">Tidak ada hasil yang ditemukan.</p>
      )}
    </div>
  );
};

export default SearchResults;
