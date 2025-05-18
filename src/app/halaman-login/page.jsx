import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // Pastikan path ini sesuai dengan struktur foldermu
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // pastikan db Firestore kamu sudah di-export


const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const backgroundLocation = location.state?.backgroundLocation || location;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = () => {
    const bgLocation = location.state?.backgroundLocation || location;
    navigate("/forgot-password", { state: { backgroundLocation: bgLocation } });
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleSignUp = () => {
    const bgLocation = location.state?.backgroundLocation || location;
    navigate("/register", { state: { backgroundLocation: bgLocation } });
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Ambil data role dari Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const role = docSnap.data().role;
      setError("");

      if (role === "admin") {
        navigate("/formwisata");
      } else {
        navigate("/");
      }
    } else {
      setError("Data user tidak ditemukan di Firestore.");
    }
  } catch (err) {
    console.error(err);
    setError("Email atau password salah!");
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-[400px] shadow-xl relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-center text-lg font-semibold mb-4">
          Don't have an account?{" "}
          <button onClick={handleSignUp} className="text-blue-600 underline">
            Sign Up
          </button>
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-semibold text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gray-400 hover:bg-gray-500 text-black font-semibold py-2 rounded-md"
          >
            Login
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-600 underline text-sm"
            >
              Forgot Password
            </button>
          </div>
        </form>

        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center space-x-6">
          <a href="#login-google">
            <img
              src="/assets/icons/google.png"
              alt="Google"
              className="w-8 h-8 cursor-pointer hover:scale-105 transition"
            />
          </a>
          <a href="#login-apple">
            <img
              src="/assets/icons/apple.png"
              alt="Apple"
              className="w-8 h-8 cursor-pointer hover:scale-105 transition"
            />
          </a>
          <a href="#login-facebook">
            <img
              src="/assets/icons/facebook.png"
              alt="Facebook"
              className="w-8 h-8 cursor-pointer hover:scale-105 transition"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
