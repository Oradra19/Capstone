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
import Login from "./components/LoginModal.jsx"; 
import Register from "./components/RegisterModal.jsx"; 

// ✅ Tambahkan ini
import { AuthProvider } from "./contexts/AuthContext"; 

function AppRoutes() {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Home />} />
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

      {backgroundLocation && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }, []);

  return (
    <AuthProvider>
      {" "}
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
