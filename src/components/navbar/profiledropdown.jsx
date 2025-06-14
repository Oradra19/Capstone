import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase"; 

const ProfileDropdown = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);

    const currentUser = auth.currentUser;
    if (loggedInStatus && currentUser) {
      setUsername(currentUser.displayName || "User");
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    setDropdownOpen(false);
  };

  return (
    <div className="flex justify-between items-center p-6">
      <img src="/assets/logo2.png" alt="Logo" className="h-20 drop-shadow-lg" />
      {isLoggedIn && (
        <div className="flex items-center gap-2 text-black font-semibold text-sm relative">
          <i className="fas fa-user-circle text-xl text-white"></i>
          <img src="/assets/icons/user-profile.png" alt="User" className="w-6 h-6 rounded" />
          <span className="font-bold cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {username}
          </span>
          <i className="fas fa-chevron-down text-xs text-black"></i>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg p-3 z-50 text-sm text-black-700">
              <Link to="/profil" className="flex items-center gap-4 px-2 py-1 hover:bg-gray-100 rounded font-semibold">
                <img src="/assets/icons/user-profile.png" alt="Profil" className="w-4 h-4" />
                Profil
              </Link>
              <Link to="/favorite" className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded font-semibold">
                <img src="/assets/icons/user-fav.png" alt="Favorite" className="w-6 h-6" />
                Favorite
              </Link>
              <Link to="/plan" className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded font-semibold">
                <img src="/assets/icons/user-plan.png" alt="Plan" className="w-6 h-6" />
                Plan
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left px-10 py-1 hover:bg-red-100 text-red-600 rounded mt-2 font-semibold text-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
