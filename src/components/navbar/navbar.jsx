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

  const handleOpenLogin = () => {
    navigate("/login", { state: { backgroundLocation: location } });

  };

  const handleOpenRegister = () => {
    navigate("/register", { state: { backgroundLocation: location } });

  };
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
    <div className="w-full bg-[#9AA6B2] rounded-b-2xl shadow-md px-4 sm:px-8 py-4 mb-6">
      <div className="flex items-center justify-between">
        <img src="/assets/logo.png" alt="logo" className="h-16 sm:h-20" />

        <div className="flex gap-2 items-center">
           {!isLoggedIn ? (
        <>
          <button
            onClick={handleOpenLogin}
            className="bg-white text-black px-4 py-2 text-sm rounded-full shadow font-semibold"
          >
            Log in
          </button>
          <button
            onClick={handleOpenRegister}
            className="bg-gray-300 px-4 py-2 text-sm rounded-full shadow font-semibold"
          >
            Sign up
          </button>
        </>
      ) : (
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-black"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src="/assets/icons/user-profile.png"
                  alt="User"
                  className="w-6 h-6 rounded"
                />
                <span className="font-bold">{userName}</span>
                <i className="fas fa-chevron-down text-xs text-black"></i>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg p-3 z-50 text-sm font-semibold">
                  <Link
                    to="/profil"
                    className="block px-4 py-1 hover:bg-gray-100 rounded"
                  >
                    Profil
                  </Link>
                  <Link
                    to="/favorite"
                    className="block px-4 py-1 hover:bg-gray-100 rounded"
                  >
                    Favorite
                  </Link>
                  <Link
                    to="/plan"
                    className="block px-4 py-1 hover:bg-gray-100 rounded"
                  >
                    Plan
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-1 mt-2 hover:bg-red-100 text-red-600 rounded font-semibold"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSearch} className="mt-1 mb-4 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Mau liburan kemana hari ini?"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full h-12 text-center rounded-full border border-gray-300 px-10 py-3 shadow bg-white placeholder-gray-500"
          />
          <button
            type="submit"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Navbar;
