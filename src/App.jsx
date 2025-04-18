// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './app/halaman-utama/page';
import Login from './app/halaman-login/page';
import Register from './app/halaman-register/page';
import UtamaLogin from './app/halaman-utama-login/page';
import UtamaProfil from './app/halaman-utama-profil/page';
import DetailWisata from './app/detail-wisata/page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/utamalogin" element={<UtamaLogin />} /> 
        <Route path="/utamaprofil" element={<UtamaProfil />} /> 
        <Route path="/detail" element={<DetailWisata />} />
      </Routes>
    </Router>
  );
}

export default App;
