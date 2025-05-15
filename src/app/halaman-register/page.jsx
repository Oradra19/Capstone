import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const backgroundLocation = location.state?.backgroundLocation || location;

  const handleClose = () => {
    navigate(-1);
  };

  const handleLogin = () => {
    navigate("/login", { state: { backgroundLocation } });
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
          Creat An Account{" "}
        </h2>

        <h3 className="text-center text-xs mb-4">
          Already have an account?{" "}
          <button onClick={handleLogin} className="text-blue-600 underline">
            Login
          </button>
        </h3>

        <form className="space-y-4">
          <div>
            <label className="block font-semibold text-sm mb-1">Username</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-400 hover:bg-gray-500 text-black font-semibold py-2 rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
