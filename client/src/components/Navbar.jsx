import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from "../api";
import Logo from "../assets/Logo/InTouch_Logo_Touchpoint.svg";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null; // Add this line to prevent rendering if user is null
  return (
    <div>
      <nav className="bg-white shadow-lg px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 flex items-center"
        >
          <div className="ml-4">
            <img className="w-30 mx-auto" src={Logo} alt="logo" />
          </div>
          &nbsp;
          <div>
            <Link to="/" className="text-lg  text-gray-700 hover:text-blue-600">
              feeds
            </Link>
          </div>
        </Link>

        <input
          type="text"
          placeholder="Search..."
          className="w-40 md:w-64 px-4 py-2 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm placeholder-gray-400"
          aria-label="Search"
        />

        <div className="flex gap-4 items-center relative">
          <Link
            to={`/profile/${user._id}`}
            className="text-sm text-gray-700 hover:text-blue-600"
          >
            {user.name}
          </Link>
          <span
            className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold hover:ring-2 hover:ring-blue-400 transition cursor-pointer"
            onClick={() => setDropdownOpen((open) => !open)}
            ref={dropdownRef}
          >
            {user.name?.charAt(0) || "U"}
            {/* Dropdown */}
            {dropdownOpen && (
              <div className=" p-4 absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-32 z-50">
                <button
                  onClick={handleLogout}
                  className="  rounded-lg block w-full text-left px-4 py-2 text-sm text-white bg-red-600 hover:bg-blue-50 hover:text-blue-700 transition hover:cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </span>
        </div>
      </nav>
    </div>
  );
}
