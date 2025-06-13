import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase"; // Pastikan path ini sesuai dengan struktur foldermu
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // pastikan db Firestore kamu sudah di-export
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";



const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

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

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Opsional: Simpan user baru ke Firestore jika belum ada
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        email: user.email,
        role: "user", // default role
        name: user.displayName || "",
        createdAt: new Date()
      });
    }

    navigate("/"); // redirect setelah login sukses
  } catch (error) {
    console.error("Google Login Error:", error);
    setError("Gagal login dengan Google.");
  }
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
        navigate("/admin/data-wisata");
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
         <button onClick={handleGoogleLogin}>
  <img
    src="/assets/icons/google.png"
    alt="Google"
    className="w-8 h-8 cursor-pointer hover:scale-105 transition"
  />
</button>

        </div>
      </div>
    </div>
  );
};

export default Login;
