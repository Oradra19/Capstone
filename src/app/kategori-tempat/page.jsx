import { Link, useParams } from "react-router-dom";
import { dataWisata } from "../../components/listwisata-detail";

export default function KategoriPage() {
  const { nama } = useParams();

  const hasilFilter = dataWisata.filter((item) =>
    item.lokasi.toLowerCase().includes(nama.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">Wisata di {nama}</h1>
        {hasilFilter.length === 0 ? (
          <p>Tidak ada data wisata untuk kategori ini.</p>
        ) : (
          hasilFilter.map((item) => (
            <Link 
            to={`/detail/${item.id}`} 
            key={item.id}
            className="block"
            >
              <div className="cursor-pointer bg-white p-4 shadow-md rounded-xl border border-black-300 flex gap-4 hover:bg-gray-50 transition">
                <img
                  src={item.image}
                  alt={item.nama}
                  className="w-32 h-24 object-cover rounded"
                />
                <div>
                  <h2 className="text-xl font-bold">{item.nama}</h2>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {item.deskripsi}
                  </p>
                  <p className="text-sm font-semibold mt-2 text-green-700">
                    Rp. {item.harga}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
        </div>
    </div>
  );
}
