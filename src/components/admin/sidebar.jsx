import { FaMapMarkerAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Sidebar = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert("Gagal logout: " + error.message);
      });
  };

  return (
    <aside className="w-64 bg-[#A6B0BC] text-black p-6 fixed top-0 left-0 h-full overflow-auto flex flex-col justify-between">
      <div>
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
          </ul>
        </nav>
      </div>
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-lg text-red-700 hover:bg-red-100 w-full py-2 px-3 rounded"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
