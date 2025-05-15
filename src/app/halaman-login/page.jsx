import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const backgroundLocation = location.state?.backgroundLocation || location;

  const handleForgotPassword = () => {
    const bgLocation = location.state?.backgroundLocation || location;
    navigate("/forgot-password", { state: { backgroundLocation: bgLocation } });
  };
  const handleClose = () => {
    navigate(-1);
  };

  const handleSignUp = () => {
    const bgLocation = location.state?.backgroundLocation || location;
    navigate("/register", { state: { backgroundLocation: bgLocation } });
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
          Don’t have an account?{" "}
          <button onClick={handleSignUp} className="text-blue-600 underline">
            Sign Up
          </button>
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block font-semibold text-sm mb-1">Username</label>
            <input
              type="text"
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
            Login
          </button>

          <div className="text-center">
            <button
              onClick={handleForgotPassword}
              className="text-blue-600 underline text-sm"
            >
              Forgot Password
            </button>
          </div>
        </form>

        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center space-x-6">
          <a href="#login-google">
            <img
              src="/assets/icons/google.png"
              alt="Google"
              className="w-8 h-8 cursor-pointer hover:scale-105 transition"
            />
          </a>
          <a href="#login-apple">
            <img
              src="/assets/icons/apple.png"
              alt="Apple"
              className="w-8 h-8 cursor-pointer hover:scale-105 transition"
            />
          </a>
          <a href="#login-facebook">
            <img
              src="/assets/icons/facebook.png"
              alt="Facebook"
              className="w-8 h-8 cursor-pointer hover:scale-105 transition"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
