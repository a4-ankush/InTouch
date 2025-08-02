import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Logo from "../assets/Logo/InTouch_Logo_Touchpoint.svg";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="blue-background flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <div className="ml-4">
          <img className="w-44 mx-auto" src={Logo} alt="logo" />
        </div>

        <h2 className="text-2xl font-semibold text-center">Create Account</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <label htmlFor="name" className="font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          className="w-full font-normal p-2 border rounded"
          required
        />
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
        <label htmlFor="bio" className="font-medium">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          onChange={handleChange}
          className="w-full font-normal p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
