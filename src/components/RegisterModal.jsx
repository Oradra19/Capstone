import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const backgroundLocation = location.state?.backgroundLocation || "/";
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleClose = () => {
    navigate(backgroundLocation);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setMessage("Username harus diisi.");
      return;
    }

    if (!email.trim()) {
      setMessage("Email harus diisi.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Format email tidak valid.");
      return;
    }

    if (!password) {
      setMessage("Password harus diisi.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password harus minimal 6 karakter.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: username,
      });

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",
        name: username,
        createdAt: new Date(),
      });

      setMessage("Sign up berhasil!");
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleLogin = () => {
    const bgLocation = location.state?.backgroundLocation || { pathname: "/" };
    navigate("/login", { state: { backgroundLocation: bgLocation } });
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
          Create An Account
        </h2>

        <h3 className="text-center text-xs mb-4">
          Already have an account?{" "}
          <button onClick={handleLogin} className="text-blue-600 underline">
            Login
          </button>
        </h3>

        <form className="space-y-4">
          <div>
            <label className="block font-semibold text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={handleSignUp}
            className="w-full bg-gray-400 hover:bg-gray-500 text-black font-semibold py-2 rounded-md"
          >
            Sign Up
          </button>

          {message && (
            <p className="text-center text-sm text-red-500 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
