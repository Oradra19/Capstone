import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Autocomplete,
  Paper,
} from "@mui/material";
import ProfileDropdown from "../../components/navbar/profiledropdown";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { addDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext"; // pastikan kamu punya context Auth
import { useNavigate } from "react-router-dom";


const BuatPlan = () => {
  const [planName, setPlanName] = useState("");
  const navigate = useNavigate();
  const [planDate, setPlanDate] = useState("");
  const [selectedWisata, setSelectedWisata] = useState([]);
  const [planPreview, setPlanPreview] = useState(null);
  const { user } = useAuth(); // gunakan context untuk cek login
  const [plans, setPlans] = useState([]);
  const [wisataList, setWisataList] = useState([]);

  // Ambil data wisata dari Firebase
  useEffect(() => {
    const fetchDataWisata = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "wisata"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWisataList(data);
      } catch (error) {
        console.error("Gagal mengambil data wisata:", error);
      }
    };

    fetchDataWisata();
  }, []);

  const handleCreatePlan = () => {
    if (!planName || !planDate || selectedWisata.length === 0) {
      alert("Lengkapi semua data terlebih dahulu!");
      return;
    }

    // Simpan data plan sementara ke state untuk preview
    const newPlan = {
      name: planName,
      date: planDate,
      destinations: selectedWisata,
    };

    setPlanPreview(newPlan);

    // Jangan reset form supaya user bisa edit lagi kalau perlu
  };

  // Ubah handleSavePlans supaya hanya simpan planPreview ke Firebase
  const handleSavePlan = async () => {
  if (!planPreview) {
    alert("Tidak ada rencana untuk disimpan!");
    return;
  }

  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert("Silakan login terlebih dahulu.");
      navigate("/login");
      return;
  }

  const uid = user.uid;

  try {
    const newPlan = {
      name: planPreview.name,
      date: planPreview.date,
      destinations: planPreview.destinations,
      createdAt: new Date(),
    };
    await addDoc(collection(db, "users", uid, "plans"), newPlan);

    alert("Rencana berhasil disimpan!");

    // Reset form dan preview
    setPlanPreview(null);
    setPlanName("");
    setPlanDate("");
    setSelectedWisata([]);

    // Arahkan ke halaman /plan
    navigate("/plan");
  } catch (error) {
    console.error("Gagal menyimpan rencana:", error);
    alert("Terjadi kesalahan saat menyimpan.");
  }
};


  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFC] font-montserrat">
      <ProfileDropdown />

      <div className="flex-grow">
        <h1 className="text-center text-4xl font-bold mb-6">Buat Plan</h1>

        <Container maxWidth="md" sx={{ marginBottom: 4 }}>
          <Paper elevation={3} sx={{ padding: { xs: 2, sm: 4 }, borderRadius: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={3}>
                <TextField
                  label="Nama Rencana"
                  variant="outlined"
                  fullWidth
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  label="Tanggal Perjalanan"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={planDate}
                  onChange={(e) => setPlanDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={wisataList} // ← gunakan data dari Firebase
                  getOptionLabel={(option) => option.nama}
                  value={selectedWisata}
                  onChange={(event, newValue) => setSelectedWisata(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Cari dan pilih destinasi wisata"
                      placeholder="Contoh: Taman Safari"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleCreatePlan}
                  sx={{ py: 1.5 }}
                >
                  Buat Rencana
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>

        {planPreview && (
          <Container maxWidth="md">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Preview Rencana
            </Typography>
            <Card
              sx={{
                padding: 2,
                marginBottom: 4,
                backgroundColor: "#fff",
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" color="primary">
                {planPreview.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Tanggal: {formatDate(planPreview.date)}
              </Typography>

              <Grid container spacing={2}>
                {planPreview.destinations.map((w, idx) => (
                  <Grid item xs={12} sm={6} md={4} key={idx}>
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: 1,
                        transition: "transform 0.2s",
                        "&:hover": { transform: "scale(1.02)" },
                      }}
                    >
                      <Box
                        sx={{ width: "100%", height: { xs: 120, sm: 160 }, overflow: "hidden" }}
                      >
                        <img
                          src={w.gambar}
                          alt={w.nama}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                      <Box sx={{ p: 1 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {w.nama}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {w.lokasi}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSavePlan}
                >
                  Simpan Rencana
                </Button>
              </Box>
            </Card>
          </Container>
        )}
      </div>

      <footer className="bg-gray-800 py-4 mt-10">
        <p className="text-center text-lg text-blue-600">
          Welcome to our website!
        </p>
        <p className="text-center text-sm text-white">copyright @timcapstone</p>
      </footer>
    </div>
  );
};

export default BuatPlan;
