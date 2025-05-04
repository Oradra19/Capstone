import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './app/halaman-utama/page';
import Login from './app/halaman-login/page';
import Register from './app/halaman-register/page';
import UtamaLogin from './app/halaman-utama-login/page';
import UtamaProfil from './app/halaman-utama-profil/page';
import PageDetailWisata from "./app/detail-wisata/page.jsx";
import Favorite from "./app/halaman-favorit/page";
import ForgotPassword from './app/halaman-forgot-password/page';
import Profile from "./app/halaman-profil/page.jsx";
import Plan from "./app/halaman-plan/page.jsx";
import PlanDetail from "./app/plan-detail/page.jsx";


function AppRoutes({ user, setUser }) {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/utamalogin" element={<UtamaLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/utamaprofil" element={<UtamaProfil />} />
        <Route path="/detail/:id" element={<PageDetailWisata />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/plan/:id" element={<PlanDetail />} />

      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <AppRoutes user={user} setUser={setUser} />
    </Router>
  );
}

export default App;

