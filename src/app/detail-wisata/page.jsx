import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import DetailWisata from "../../components/detailwisata";

export default function PageDetailWisata() {
  const { id } = useParams();
  const [wisata, setWisata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWisata = async () => {
      try {
        const docRef = doc(db, "wisata", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setWisata({ id: docSnap.id, ...docSnap.data() });
        } else {
          setWisata(null);
        }
      } catch (error) {
        console.error("Gagal mengambil detail wisata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWisata();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Memuat detail...</p>;
  if (!wisata) return <p className="text-center mt-6">Wisata tidak ditemukan</p>;

  return (
    <DetailWisata
      nama={wisata.nama}
      lokasi={wisata.lokasi}
      deskripsi={wisata.deskripsi}
      gambar={wisata.gambar}
      harga={wisata.harga}
      rating={wisata.rating}
      mapsLink={wisata.gmaps}
    />
  );
}
