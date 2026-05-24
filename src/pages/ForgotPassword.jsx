import { useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";

function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/forgot-password",
        { email }
      );

      toast.success(
        "Reset email sent"
      );

    } catch (error) {

      toast.error(
        "Failed to send reset email"
      );

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-2xl font-bold mb-6">

          Forgot Password

        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="border p-3 w-full mb-4 rounded-lg"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <button className="bg-blue-600 text-white w-full p-3 rounded-lg">

          Send Reset Link

        </button>

      </form>

    </div>

  );

}

export default ForgotPassword;