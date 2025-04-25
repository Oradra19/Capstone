const dataWisata = [
    {
      nama: "Tumurun Private Museum",
      deskripsi:
        "Tumurun Private Museum memang masih tergolong baru. Namun cukup populer bagi warga sekitar. bagaimana tidak, banyak spot foto unik yang cocok untuk didatangi oleh kaula muda.Perlu diperhatikan, tempat hits di Kota Solo ini bersifat private dan wajib reservasi sebelum masuk.",
      image: "/assets/ListWisata/tumurun.png",
    },

    {
      nama: "Air Terjun Grojogan Sewu",
      deskripsi:
        "Salah satu tempat wisata paling hits di Karanganyar adalah Grojogan Sewu Tawangmangu. Air terjun dengan tinggi 80 meter ini berlokasi di sisi barat Gunung Lawu, atau sekitar 37 kilometer dari pusat Kota Solo. Air terjun inin merupakan air terjun tertinggi di wilayah Jawa Tengah.",
      image: "/assets/ListWisata/grojogan.png",
    },

    {
        nama: "Museum Manusia Purba Sangiran",
        deskripsi:
        "Salah satu wisata edukasi yang berada di Kabupaten Sragen tepatnya di Kecamatan Kalijambe. Objek wisata edukasi ini tidak jauh dari situs fosil purbakala Sangiran, yang sudah ditetapkan oleh UNESCO sebagai salah satu warisan dunia.",
        image: "/assets/ListWisata/museum.png",
    },

    {
        nama: "Pantai Nampu",
        deskripsi:
        "Pantai yang terletak di ujung Kabupaten Wonogiri ini merupakan salah satu dari beberapa pantai yang masih berada di Eks Karesidenan Surakarta. Keindahan Pantai Nampu memang tidak bisa dianggap biasa saja terbukti dengan ramainya pantai ini pada akhir pekan.",
        image: "/assets/ListWisata/nampu.png",
      },

    {
        nama: "Embung Manajar",
        deskripsi:
        "Wisata Embung Manajar Selo Boyolali terletak di atas ketinggian 1.700 meter di atas permukaan laut (mdpl), serta memiliki luas sekitar 1.602 meter persegi. Latar Gunung Merbabu yang instagramable, dan Gunung Merapi yang legendaris. Selain itu, pengunjung juga bisa melakukan camping.",
        image: "/assets/ListWisata/manajar.png",
    },

    {
        nama: "Candi Prambanan",
        deskripsi:
        "Candi Prambanan merupakan kompleks candi bercorak Hindu terbesar di dunia yang sudah ditetapkan sebagai Warisan Budaya Dunia (world heritage) oleh UNESCO. Sebagian kawasan Candi Prambanan masuk wilayah Klaten, sementara lainnya masuk daerah Sleman, Yogyakarta.",
        image: "/assets/ListWisata/prambanan.png",
    },

    {
        nama: "Gunung Sepikul",
        deskripsi:
        "Gunung Sepikul adalah salah-satu gunung yang ada di Sukoharjo yang cocok dijadikan tujuan pendakian untuk para pemula. Gunung Sepikul memiliki ketinggian sekitar 350 mdpl, dengan sudut kemiringan 40 – 60 derajat. Gunung Sepikul adalah dua gunung batu yang saling berhadapan.",
        image: "/assets/ListWisata/sepikul.png",
    },
  ];
  
  export default function WisataList() {
    return (
      <div className="mt-4 px-4 space-y-6 mx-auto max-w-[1450px]">
        {dataWisata.map((item, idx) => (
          <div key={idx} className="bg-white p-4 shadow-md rounded-xl border-2 border-black flex gap-4">
            <img src={item.image} alt={item.nama} className="w-40 h-28 object-cover rounded-md" />
            <div>
              <h2 className="text-xl font-bold">{item.nama}</h2>
              <p className="text-sm text-gray-700">{item.deskripsi}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  
  