import React from "react";
import { Link, useLocation } from "react-router-dom";
import { dataWisata } from "../../components/listwisata-detail";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get("query")?.toLowerCase() || "";
  const filteredResults = dataWisata.filter(
    (item) =>
      item.nama.toLowerCase().includes(query) ||
      item.deskripsi.toLowerCase().includes(query)
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Hasil Pencarian: "{query}"</h2>
      {filteredResults.length > 0 ? (
        <div className="space-y-4">
          {filteredResults.map((item, idx) => (
            <Link to={`/detail-wisata/${item.id}`} key={item.id} className="block">
              <div className="cursor-pointer bg-white p-4 shadow-md rounded-xl border border-black-300 flex gap-4 hover:bg-gray-50 transition">
                <img
                  src={item.image}
                  alt={item.nama}
                  className="w-32 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="text-xl font-bold">{item.nama}</h3>
                  <p className="text-gray-700 text-sm line-clamp-3">{item.deskripsi}</p>
                  <p className="text-green-600 font-medium mt-2">{item.harga}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Tidak ada hasil yang ditemukan.</p>
      )}
    </div>
  );
};

export default SearchResults;
