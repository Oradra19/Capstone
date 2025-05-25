import { FaUser } from "react-icons/fa";

const Header = ({ title }) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">{title}</h1>
    <div className="flex items-center gap-2 text-black font-bold">
      <FaUser className="text-xl" /> Admin Gantenk
    </div>
  </div>
);

export default Header;

