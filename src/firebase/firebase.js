// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA7A7-hASzNuBwdubBMUq8ScwLYtbeqK08",
  authDomain: "destinasiku-b882d.firebaseapp.com",
  projectId: "destinasiku-b882d",
  storageBucket: "destinasiku-b882d.firebasestorage.app",
  messagingSenderId: "857884833492",
  appId: "1:857884833492:web:6d749eab8e126b9473ed41",
  measurementId: "G-01J0MLR78B"
};

// ✅ Inisialisasi Firebase
const app = initializeApp(firebaseConfig);


// ✅ Ekspor instance Firebase yang dibutuhkan
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { app }; // ✅ Tambahkan ini jika kamu butuh app di tempat lain
