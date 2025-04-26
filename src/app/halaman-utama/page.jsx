import Navbar from "../../components/navbar/navbar";
import Kategori from "../../components/kategori";
import BannerPromo from "../../components/banner";
import WisataList from "../../components/listwisata";

const HalamanUtama = ({user}) => {
    return (
      <div className="min-h-screen bg-[#f8f8f8]">
        <Navbar user={user} />
        <div className="mt-4">
          <Kategori />
          <BannerPromo />
          <WisataList />
        </div>
        <footer className="bg-gray-800 py-4 mt-8">
            <p className="text-center text-lg text-blue-600 mt-8 mb-4">Welcome to our website!</p>
            <p className="text-center text-sm text-white">copyright @timcapstone</p>
          
        </footer>
      </div>
    );
  };

export default HalamanUtama;
