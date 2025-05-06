import { useParams } from "react-router-dom";
import { dataWisata } from "../../components/listwisata-detail";
import DetailWisata from "../../components/detailwisata";

export default function PageDetailWisata() {
  const { id } = useParams();
  const wisataId = parseInt(id);

  const wisata = dataWisata.find(w => w.id === wisataId);

  console.log("ID dari URL:", wisataId);
  console.log("Wisata ditemukan:", wisata);

  if (!wisata) return <p>Wisata tidak ditemukan</p>;

  const mapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${wisata.latitude},${wisata.longitude}`;

  return (
    <DetailWisata
      nama={wisata.nama}
      lokasi={wisata.lokasi}
      deskripsi={wisata.deskripsi}
      gambar={wisata.image}
      harga={wisata.harga}
      rating={wisata.rating}
      mapsEmbedUrl={mapsEmbedUrl}
    />
  );
}

