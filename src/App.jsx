import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './app/halaman-utama/page';
import Login from './app/halaman-login/page';
import Register from './app/halaman-register/page';
import UtamaLogin from './app/halaman-utama-login/page';
import UtamaProfil from './app/halaman-utama-profil/page';
import PageDetailWisata from "./app/detail-wisata/page.jsx";
import Favorite from "./app/halaman-favorit/page";

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
        <Route path="/utamaprofil" element={<UtamaProfil />} />
        <Route path="/detail/:id" element={<PageDetailWisata />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          {/* Modal routes for login and register */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
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
