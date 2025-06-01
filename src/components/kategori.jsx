import { useNavigate } from "react-router-dom";

const Kategori = () => {
  const navigate = useNavigate();

  const kategoriList = [
    { nama: "Solo", img: "/assets/solo.png" },
    { nama: "Karanganyar", img: "/assets/kra.png" },
    { nama: "Boyolali", img: "/assets/byl.png" },
    { nama: "Wonogiri", img: "/assets/wng.png" },
    { nama: "Klaten", img: "/assets/klt.png" },
    { nama: "Sukoharjo", img: "/assets/skh.png" },
    { nama: "Sragen", img: "/assets/sra.png" },
  ];

  const handleClick = (nama) => {
    navigate(`/kategori/${nama}`);
  };

  return (
    <div className="-mt-10 px-6 relative z-10">
      <div className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-[700px] h-auto mx-auto">
        <div className="flex justify-center gap-6 w-max mx-auto">
          {kategoriList.map((kategori, index) => (
            <div
              key={index}
              onClick={() => handleClick(kategori.nama)}
              className="flex flex-col items-center min-w-[64px] cursor-pointer"
            >
              <img
                src={kategori.img}
                alt={kategori.nama}
                className="w-14 h-14 object-cover rounded-full border border-gray-300"
              />
              <p className="text-xs font-medium mt-2">{kategori.nama}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Kategori;
