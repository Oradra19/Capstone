"use client";
import { useParams } from "react-router-dom";
import { dataWisata } from "../../components/listwisata-detail";

export default function KategoriPage() {
  const { nama } = useParams();

  const hasilFilter = dataWisata.filter((item) =>
    item.lokasi.toLowerCase().includes(nama.toLowerCase())
  );

  return (
    <div className="px-4 mt-6 max-w-[1450px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Wisata di {nama}</h1>
      {hasilFilter.length === 0 ? (
        <p>Tidak ada data wisata untuk kategori ini.</p>
      ) : (
        hasilFilter.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 mb-4 rounded-xl border-2 border-black flex gap-4"
          >
            <img
              src={item.image}
              alt={item.nama}
              className="w-40 h-28 object-cover rounded-md"
            />
            <div>
              <h2 className="text-xl font-bold">{item.nama}</h2>
              <p className="text-sm text-gray-700 line-clamp-3">{item.deskripsi}</p>
              <p className="text-sm font-semibold mt-2 text-green-700">Rp. {item.harga}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
