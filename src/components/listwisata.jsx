import { useNavigate } from "react-router-dom";

export default function WisataList({ destinasi, searchKeyword }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/detail/${id}`);
  };

  if (!destinasi || destinasi.length === 0) {
    return <p className="text-center mt-6">Belum ada destinasi tersedia.</p>;
  }

  const filteredDestinasi = destinasi.filter((item) =>
    item.nama.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  if (filteredDestinasi.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        Destinasi tidak ditemukan.
      </p>
    );
  }

  return (
    <div className="mt-4 px-4 space-y-6 mx-auto max-w-[1450px]">
      {filteredDestinasi.map((item) => (
        <div
          key={item.id}
          onClick={() => handleClick(item.id)}
          className="cursor-pointer bg-white p-4 shadow-md rounded-xl border border-gray-300 flex flex-col md:flex-row gap-4 hover:bg-gray-100 transition"
        >
          <img
            src={item.gambar}
            alt={item.nama}
            className="w-full md:w-40 h-40 md:h-28 object-cover rounded-md"
          />
          <div className="flex-1">
            <h2 className="text-lg md:text-xl font-bold">{item.nama}</h2>
            <p className="text-sm text-gray-700 line-clamp-3">
              {item.deskripsi}
            </p>
            <p className="text-sm font-semibold mt-2 text-green-700">
              Rp{item.harga}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
