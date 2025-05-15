import { useNavigate, useLocation } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("Location state di forgot-password:", location.state);

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
          Forgot Password
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block font-semibold text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-400 hover:bg-gray-500 text-black font-semibold py-2 rounded-md"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
