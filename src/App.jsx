import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./app/halaman-utama/page";
import PageDetailWisata from "./app/detail-wisata/page.jsx";
import Favorite from "./app/halaman-favorit/page";
import ForgotPassword from "./app/halaman-forgot-password/page";
import Profile from "./app/halaman-profil/page.jsx";
import Plan from "./app/halaman-plan/page.jsx";
import PlanDetail from "./app/plan-detail/page.jsx";
import BuatPlan from "./app/buat-plan/page.jsx";
import KategoriTempat from "./app/kategori-tempat/page.jsx";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import FormWisata from "./components/formwisatainput.jsx";
// import DataUserPage from "./app/admin/data-user/page.jsx";
import DataWisataPage from "./app/admin/data-wisata/page.jsx";
import Login from "./components/LoginModal.jsx"; // pastikan path sesuai
import Register from "./components/RegisterModal.jsx"; // pastikan path sesuai

// ✅ Tambahkan ini
import { AuthProvider } from "./contexts/AuthContext"; // sesuaikan path

function AppRoutes() {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/detail/:id" element={<PageDetailWisata />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/plan/:id" element={<PlanDetail />} />
        <Route path="/buat-plan" element={<BuatPlan />} />
        <Route path="/formwisata" element={<FormWisata />} />
        <Route path="/kategori/:nama" element={<KategoriTempat />} />
        <Route path="/admin/data-wisata" element={<DataWisataPage />} />
      </Routes>

      {/* Modal login dan register ditampilkan sebagai overlay */}
      {backgroundLocation && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyA7A7-hASzNuBwdubBMUq8ScwLYtbeqK08",
      authDomain: "destinasiku-b882d.firebaseapp.com",
      projectId: "destinasiku-b882d",
      storageBucket: "destinasiku-b882d.firebasestorage.app",
      messagingSenderId: "857884833492",
      appId: "1:857884833492:web:6d749eab8e126b9473ed41",
      measurementId: "G-01J0MLR78B",
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }, []);

  return (
    <AuthProvider>
      {" "}
      {/* ✅ Bungkus semua dengan AuthProvider */}
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
