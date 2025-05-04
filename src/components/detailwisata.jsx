export default function DetailWisata({ nama, lokasi, deskripsi, gambar, harga, rating, mapsEmbedUrl }) {

  function tambahKeLocalStorage(key, destinasi) {
    const existing = JSON.parse(localStorage.getItem(key)) || [];
  
    // Cek apakah sudah ada berdasarkan nama
    const sudahAda = existing.some(item => item.nama === destinasi.nama);
  
    if (!sudahAda) {
      existing.push(destinasi);
      localStorage.setItem(key, JSON.stringify(existing));
      alert(`Ditambahkan ke ${key === "rencana" ? "Plan" : "Favorit"}!`);
    } else {
      alert(`${destinasi.nama} sudah ada di ${key === "rencana" ? "Plan" : "Favorit"}.`);
    }
  }
  


  return (
    <>
      <div className="min-h-screen bg-[#F9FAFC] py-10 px-4 flex justify-center">
        <div className="fixed top-8 left-10 z-50">
          <img src="/assets/logo2.png" alt="logo" className="h-20 drop-shadow-lg" />
        </div>
        
        <div className="w-full max-w-6xl bg-[#E9E9E9] border border-gray-300 shadow-lg rounded-xl p-6 space-y-6">
          <img src={gambar} alt={nama} className="w-full h-64 object-cover rounded-xl shadow" />

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">{nama}</h1>
            <p className="text-gray-600">📍 {lokasi}</p>
            <p className="text-gray-700 leading-relaxed">{deskripsi}</p>
            <p className="text-lg font-semibold text-green-700">🎟️ Harga tiket: Rp{harga.toLocaleString()}</p>
            <p className="text-yellow-500">⭐ Rating: {rating}</p>
          </div>

          <div className="flex gap-4 flex-wrap">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() =>
                tambahKeLocalStorage("rencana", {
                  nama,
                  lokasi,
                  deskripsi,
                  gambar,
                  harga,
                  rating,
                  mapsEmbedUrl,
                })
              }
              
            >
              Tambah ke Plan
            </button>

            <button
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              onClick={() =>
                tambahKeLocalStorage("favorite", {
                  nama,
                  lokasi,
                  deskripsi,
                  gambar,
                  harga,
                  rating,
                  mapsEmbedUrl,
                })
              }
              
            >
              Tambah ke Favorite
            </button>
          </div>

          <div className="mt-4">
            <iframe
              src={mapsEmbedUrl}
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg border border-gray-200"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 py-4 mt-8">
          <p className="text-center text-lg text-blue-600 mt-8 mb-4">Welcome to our website!</p>
          <p className="text-center text-sm text-white">copyright @timcapstone</p>
      </footer>
      </>
    );
    }
