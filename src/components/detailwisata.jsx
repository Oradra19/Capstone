export default function DetailWisata({ nama, lokasi, deskripsi, gambar, harga, rating, mapsEmbedUrl }) {

  function tambahKeLocalStorage(kategori, namaWisata) {
    const key = `wisata_${kategori}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];
  
    if (!existing.includes(namaWisata)) {
      existing.push(namaWisata);
      localStorage.setItem(key, JSON.stringify(existing));
      alert(`Ditambahkan ke ${kategori}!`);
    } else {
      alert(`${namaWisata} sudah ada di ${kategori}.`);
    }
  } 

    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <img src={gambar} alt={nama} className="w-full h-64 object-cover rounded-xl" />
  
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{nama}</h1>
          <p className="text-gray-600">📍 {lokasi}</p>
          <p className="text-gray-700">{deskripsi}</p>
          <p className="text-lg font-semibold text-green-700">🎟️ Harga tiket: Rp{harga.toLocaleString()}</p>
          <p className="text-yellow-500">⭐ Rating: {rating}</p>
        </div>
  
        <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => tambahKeLocalStorage("rencana", nama)}
        >
          Tambah ke Rencana
        </button>

        <button
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
          onClick={() => tambahKeLocalStorage("favorit", nama)}
        >
          Tambah ke Favorit
        </button>

        </div>
  
        <div className="mt-4">
          <iframe
            src={mapsEmbedUrl}
            width="100%"
            height="300"
            allowFullScreen=""
            loading="lazy"
            className="rounded-lg"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    );
  }
  