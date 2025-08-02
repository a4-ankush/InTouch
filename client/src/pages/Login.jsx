import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Logo from "../assets/Logo/InTouch_Logo_Touchpoint.svg";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/login", formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="blue-background flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <div className="ml-4">
          <img className="w-44 mx-auto " src={Logo} alt="logo" />
        </div>

        <h2 className="text-2xl font-semibold text-center">
          Login to your account
        </h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          className="w-full font-normal p-2 border rounded"
          required
        />
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          className="w-full font-normal p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
