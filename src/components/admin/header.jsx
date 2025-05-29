import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // pastikan path db sesuai

const Header = ({ title }) => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setAdminName(userDoc.data().nama || "Admin");
      } else {
        setAdminName("Admin");
      }
    } else {
      setAdminName("Belum Login");
    }
  });

  return () => unsubscribe();
}, []);
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-2 text-black font-bold">
        <FaUser className="text-xl" /> {adminName}
      </div>
    </div>
  );
};

export default Header;
