import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-[#A6B0BC] text-black p-6 fixed top-0 left-0 h-full overflow-auto">

      <div className="text-3xl font-bold mb-6">
        <img src="/assets/logo.png" alt="logo" className="h-16 mb-2" />
      </div>
      <nav>
        <ul>
          <li
            className="flex items-center gap-2 py-2 text-lg cursor-pointer hover:bg-gray-300 rounded"
            onClick={() => navigate("/admin/data-wisata")}
          >
            <FaMapMarkerAlt /> Data Destinasi Wisata
          </li>
          <li
            className="flex items-center gap-2 py-2 text-lg cursor-pointer hover:bg-gray-300 rounded"
            onClick={() => navigate("/admin/data-user")}
          >
            <FaUser /> Data User
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
