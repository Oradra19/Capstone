export const dataWisata = [
    {
      nama: "Tumurun Private Museum",
      deskripsi:
        "Tumurun Private Museum memang masih tergolong baru. Namun cukup populer bagi warga sekitar. bagaimana tidak, banyak spot foto unik yang cocok untuk didatangi oleh kaula muda.Perlu diperhatikan, tempat hits di Kota Solo ini bersifat private dan wajib reservasi sebelum masuk.",
      image: "/assets/ListWisata/tumurun.png",
      harga: "Rp. 25.000 (Wajib Reservasi)"
    },

    {
      nama: "Air Terjun Grojogan Sewu",
      deskripsi:
        "Salah satu tempat wisata paling hits di Karanganyar adalah Grojogan Sewu Tawangmangu. Air terjun dengan tinggi 80 meter ini berlokasi di sisi barat Gunung Lawu, atau sekitar 37 kilometer dari pusat Kota Solo. Air terjun inin merupakan air terjun tertinggi di wilayah Jawa Tengah.",
      image: "/assets/ListWisata/grojogan.png",
      harga: "Rp. 22.000"
    },

    {
        nama: "Museum Manusia Purba Sangiran",
        deskripsi:
        "Salah satu wisata edukasi yang berada di Kabupaten Sragen tepatnya di Kecamatan Kalijambe. Objek wisata edukasi ini tidak jauh dari situs fosil purbakala Sangiran, yang sudah ditetapkan oleh UNESCO sebagai salah satu warisan dunia.",
        image: "/assets/ListWisata/museum.png",
        harga: "Rp. 5.000"
    },

    {
        nama: "Pantai Nampu",
        deskripsi:
        "Pantai yang terletak di ujung Kabupaten Wonogiri ini merupakan salah satu dari beberapa pantai yang masih berada di Eks Karesidenan Surakarta. Keindahan Pantai Nampu memang tidak bisa dianggap biasa saja terbukti dengan ramainya pantai ini pada akhir pekan.",
        image: "/assets/ListWisata/nampu.png",
        harga: "Rp. 2.000"
      },

    {
        nama: "Embung Manajar",
        deskripsi:
        "Wisata Embung Manajar Selo Boyolali terletak di atas ketinggian 1.700 meter di atas permukaan laut (mdpl), serta memiliki luas sekitar 1.602 meter persegi. Latar Gunung Merbabu yang instagramable, dan Gunung Merapi yang legendaris. Selain itu, pengunjung juga bisa melakukan camping.",
        image: "/assets/ListWisata/manajar.png",
        harga: "Rp. 5.000"

    },

    {
        nama: "Candi Prambanan",
        deskripsi:
        "Candi Prambanan merupakan kompleks candi bercorak Hindu terbesar di dunia yang sudah ditetapkan sebagai Warisan Budaya Dunia (world heritage) oleh UNESCO. Sebagian kawasan Candi Prambanan masuk wilayah Klaten, sementara lainnya masuk daerah Sleman, Yogyakarta.",
        image: "/assets/ListWisata/prambanan.png",
        harga: "Rp. 50.000"
    },

    {
        nama: "Gunung Sepikul",
        deskripsi:
        "Gunung Sepikul adalah salah-satu gunung yang ada di Sukoharjo yang cocok dijadikan tujuan pendakian untuk para pemula. Gunung Sepikul memiliki ketinggian sekitar 350 mdpl, dengan sudut kemiringan 40 – 60 derajat. Gunung Sepikul adalah dua gunung batu yang saling berhadapan.",
        image: "/assets/ListWisata/sepikul.png",
        harga: "Gratis"
    },

    {
      nama: "Rumah Atsiri Indonesia",
      deskripsi:
      "wisata edukasi tentang minyak esensial, di sini wisatawan dapat mengetahui tumbuhan aromatik di tamannya. juga green house, museum, dan wisatawan dapat mengikuti kelas atau workshop pembuatan minyak esensial.",
      image: "/assets/ListWisata/atsiri.png",
      harga: "Rp. 50.000"
    },

    {
      nama: "Rasa Madu",
      deskripsi:
      "Obyek wisata bertema Eropa klasik dengan beragam spot foto Instagramable. Merupakan Pabrik Gula (PG) Gembongan, peninggalan kolonial Belanda yang didirikan pada 1899 silam.",
      image: "/assets/ListWisata/rasamadu.png",
      harga: "Rp. 65.000"
    },

    {
      nama: "Solo Safari",
      deskripsi:
      "Wisata yang cocok dikunjungi keluarga terdapat beberapa satwa, terdapat area playground, wahana seru, pertunjukan satwa. Merupakan revitalisasi dari Taman Satwa Taru Jurug.",
      image: "/assets/ListWisata/safari.png",
      harga: "Rp. 45.000"
    },

    {
      nama: "Masjid Raya Sheikh Zayed",
      deskripsi:
      "ikon wisata religi baru Kota Solo. Replika Sheikh Zayed Grand Mosque di Abu Dhabi, UEA. Masjid megah ini merupakan hibah dari Putra Mahkota UEA Sheikh Mohammed bin Zayed Al Nahyan kepada Presiden Jokowi.",
      image: "/assets/ListWisata/zayed.png",
      harga: "Gratis"
    },
  ];
  
  import { useNavigate } from "react-router-dom";

  export default function WisataList() {
    const navigate = useNavigate();
  
    const handleClick = (idx) => {
      navigate(`/detail/${idx}`);
    };
  
  
    return (
      <div className="mt-4 px-4 space-y-6 mx-auto max-w-[1450px]">
        {dataWisata.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(idx)}
            className="cursor-pointer bg-white p-4 shadow-md rounded-xl border-2 border-black flex gap-4 hover:bg-gray-100 transition"
          >
            <img src={item.image} alt={item.nama} className="w-40 h-28 object-cover rounded-md" />
            <div>
              <h2 className="text-xl font-bold">{item.nama}</h2>
              <p className="text-sm text-gray-700 line-clamp-3">{item.deskripsi}</p>
              <p className="text-sm font-semibold mt-2 text-green-700">{item.harga}</p>

            </div>
          </div>
        ))}
      </div>
    );
  }
  
  
  
  
  