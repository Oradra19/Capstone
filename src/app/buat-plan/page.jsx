import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Autocomplete,
  Paper,
} from "@mui/material";
import { dataWisata } from "../../components/listwisata";
import ProfileDropdown from "../../components/navbar/profiledropdown";

const BuatPlan = () => {
  const [planName, setPlanName] = useState("");
  const [planDate, setPlanDate] = useState("");
  const [selectedWisata, setSelectedWisata] = useState([]);
  const [planId, setPlanId] = useState(1);
  const [plans, setPlans] = useState([]);

  

  const handleCreatePlan = () => {
    if (!planName || !planDate || selectedWisata.length === 0) {
      alert("Lengkapi semua data terlebih dahulu!");
      return;
    }
  
    const savedPlans = JSON.parse(localStorage.getItem("customPlans")) || [];
  
    const isDuplicate = savedPlans.some(
      (plan) => plan.name === planName && plan.date === planDate
    );
    if (isDuplicate) {
      alert("Plan dengan nama dan tanggal yang sama sudah ada!");
      return;
    }
  
    // Ambil total jumlah plan dari localStorage + state lokal
    const totalPlans = savedPlans.length + plans.length;
  
    const newPlan = {
      planId: `Plan ${totalPlans + 1}`, // ← penomoran plan yang benar
      name: planName,
      date: planDate,
      destinations: selectedWisata,
    };
  
    const updatedPlans = [...plans, newPlan]; // hanya update state lokal dulu
  
    setPlans(updatedPlans); // update state
    setPlanName("");
    setPlanDate("");
    setSelectedWisata([]);
  };
  
  
  
  const handleSavePlans = () => {
    if (plans.length === 0) {
      alert("Tidak ada plan untuk disimpan!");
      return;
    }
  
    const existingPlans = JSON.parse(localStorage.getItem("customPlans")) || [];
    const updatedPlans = [...existingPlans, ...plans];
  
    localStorage.setItem("customPlans", JSON.stringify(updatedPlans));
    alert("Rencana berhasil disimpan ke halaman Plan!");
    setPlans([]);
  };
  
  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // bulan dimulai dari 0
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFC] font-montserrat">
      <ProfileDropdown />

      <div className="flex-grow">
        <h1 className="text-center text-4xl font-bold mb-6">Buat Plan</h1>

        <Container maxWidth="md" sx={{ marginBottom: 4 }}>
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Nama Rencana"
                  variant="outlined"
                  fullWidth
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
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
                  options={dataWisata}
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

        <Container maxWidth="md">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Rencana yang Telah Dibuat
          </Typography>
          {plans.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              Belum ada rencana dibuat.
            </Typography>
          ) : (
            plans.map((plan, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  marginBottom: 4,
                  padding: 2,
                  backgroundColor: "#ffffff",
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {plan.planId}: {plan.name}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Tanggal: {formatDate(plan.date)}
                  </Typography>


                  <Grid container spacing={2}>
                    {plan.destinations.map((w, idx) => (
                      <Grid item xs={12} sm={6} md={4} key={idx}>
                        <Box
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: 2,
                            overflow: "hidden",
                            boxShadow: 1,
                            transition: "transform 0.2s",
                            "&:hover": {
                              transform: "scale(1.02)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              height: 160,
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={w.image}
                              alt={w.nama}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
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
                </CardContent>
              </Card>
            ))
          )}
        </Container>


{plans.length > 0 && (
  <Box sx={{ textAlign: "center", mb: 4 }}>
    <Button
      variant="contained"
      color="success"
      onClick={handleSavePlans}
    >
      Simpan Plan
    </Button>
  </Box>
)}


      </div>

      <footer className="bg-gray-800 py-4 mt-10">
        <p className="text-center text-lg text-blue-600">
          Welcome to our website!
        </p>
        <p className="text-center text-sm text-white">
          copyright @timcapstone
        </p>
      </footer>
    </div>
  );
};

export default BuatPlan;
