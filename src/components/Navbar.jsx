import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import toast from "react-hot-toast";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    logoutUser();

    toast.success("Logged Out");

    navigate("/");

  };

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <div>

        <h1 className="text-2xl font-bold text-blue-900">
          Teacher Attendance System
        </h1>

      </div>

      <div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;