const Kategori = () => {
    const kategoriList = [
      { nama: "Solo", img: "/public/assets/solo.png" },
      { nama: "Karanganyar", img: "/public/assets/kra.png" },
      { nama: "Boyolali", img: "/public/assets/byl.png" },
      { nama: "Wonogiri", img: "/public/assets/wng.png" },
      { nama: "Klaten", img: "/public/assets/klt.png" },
      { nama: "Sukoharjo", img: "/public/assets/skh.png" },
      { nama: "Sragen", img: "/public/assets/sra.png" },
    ];
  
    return (
      <div className="mt-4 px-6 overflow-x-auto">
        <div className="flex justify-center mt-6">
        <div className="flex space-x-4 w-max">
            {kategoriList.map((kategori, index) => (
            <div key={index} className="text-center">
                <img
                src={kategori.img}
                alt={kategori.nama}
                className="w-16 h-16 object-cover rounded-full border mx-auto"
                />
                <p className="text-sm font-semibold mt-1">{kategori.nama}</p>
            </div>
             ))}
        </div>
        </div>
      </div>
    );
  };
  
  export default Kategori;
  