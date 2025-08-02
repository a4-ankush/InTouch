import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import Logo from "../assets/Logo/InTouch_Logo_Touchpoint.svg";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch {
      setUser(null); // not logged in
    }
  };

  const handleLogout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return null; // Add this line to prevent rendering if user is null
  return (
    <div className="p-6">
      <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center rounded-2xl">
        <Link to="/" className="text-xl font-bold text-blue-600">
          <div className="">
            <img className="w-30 mx-auto" src={Logo} alt="logo" />
          </div>
        </Link>

        <div className="flex gap-4 items-center">
          <Link
            to={`/profile/${user._id}`}
            className="text-sm text-gray-700 hover:text-blue-600"
          >
            {user.name}
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}
