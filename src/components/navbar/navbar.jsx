import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // sesuaikan dengan path file firebase.js

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        console.log("User logged in:", user);
        setUserName(user.displayName || user.email || "User");
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    setDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchKeyword)}`);
      setSearchKeyword("");
    }
  };

  return (
    <div className="w-full h-[160px] bg-[#9AA6B2] rounded-b-2xl shadow-md px-8 py-6 flex items-center justify-between relative">
      <img src="/assets/logo.png" alt="logo" className="h-20" />

      <form onSubmit={handleSearch} className="flex-1 flex justify-center relative">
        <input
          type="text"
          placeholder="Mau liburan kemana hari ini?"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="w-full max-w-lg h-12 text-center rounded-full border border-gray-300 px-10 py-3 shadow bg-white placeholder-gray-500"
        />
        <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
          <i className="fas fa-search"></i>
        </button>
      </form>

      <div className="flex gap-2 items-center relative">
        {!isLoggedIn ? (
          <>
            <Link to="/login" state={{ backgroundLocation: location }} className="bg-white text-black-700 px-5 py-2 text-sm flex items-center gap-2 rounded-full shadow">
              <i className="fas fa-user-circle text-black-500 text-lg"></i>
              <span className="font-semibold">Log in</span>
            </Link>
            <Link to="/register" state={{ backgroundLocation: location }} className="bg-gray-300 px-5 py-2 text-sm rounded-full shadow flex items-center gap-2">
              <i className="fas fa-user-plus"></i>
              <span className="font-semibold">Sign up</span>
            </Link>
          </>
        ) : (
          <>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-black" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <i className="fas fa-user-circle text-white text-xl"></i>
              <img src="/assets/icons/user-profile.png" alt="User" className="w-6 h-6 rounded" />
              <span className="font-bold">{userName}</span>
              <i className="fas fa-chevron-down text-xs text-black"></i>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-[100%] mt-2 w-40 bg-white rounded-xl shadow-lg p-3 z-50 text-sm text-black-700">
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
                <button onClick={handleLogout} className="flex items-center gap- w-full text-left px-10 py-1 hover:bg-red-100 text-red-600 rounded mt-2 font-semibold text-lg">
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
