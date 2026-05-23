import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/authService";
import { useEffect } from "react";
import { isAuthenticated } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleLogin = (e) => {

    e.preventDefault();

    const success = loginUser(
      formData.email,
      formData.password
    );

    if (success) {

      toast.success("Login Successful");

      navigate("/dashboard");

    } else {

      toast.error("Invalid Credentials");

    }

  };

  useEffect(() => {

    if (isAuthenticated()) {
        navigate("/dashboard");
    }

    }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[90%] md:w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Teacher Attendance System
        </h1>

        <form onSubmit={handleLogin}>

          <div className="mb-4">

            <label className="block mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none"
              placeholder="Enter email"
            />

          </div>

          <div className="mb-6">

            <label className="block mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg outline-none"
              placeholder="Enter password"
            />

          </div>

          <button
            className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Login
          </button>

        </form>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg text-sm">

          <p className="font-semibold mb-2">
            Demo Login
          </p>

          <p>Email: admin@gmail.com</p>

          <p>Password: 123456</p>

        </div>

      </div>

    </div>
  );
}

export default Login;