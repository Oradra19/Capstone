import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase"; 
import { useNavigate, useLocation } from "react-router-dom";

const ForgotPassword = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Link reset password telah dikirim ke email Anda.");
    } catch (error) {
      console.error("Gagal mengirim email:", error);
      setMessage("Gagal mengirim email. Coba lagi.");
    }
  };

  const handleClose = () => {
    if (location.state?.backgroundLocation) {
      navigate(-1);
    } else {
      navigate("/");
    }
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
          Reset Password
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan email Anda"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-md"
          >
            Kirim Link Reset
          </button>
        </form>
        {message && (
          <p className="text-center text-sm text-green-600 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
