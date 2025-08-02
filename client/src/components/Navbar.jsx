import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from "../api";
import Logo from "../assets/Logo/InTouch_Logo_Touchpoint.svg";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  const handleLogout = async () => {
    console.log("Logout clicked"); // Debug line
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error", err);
    }
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setTimeout(() => setDropdownOpen(false), 100);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <nav className="bg-white shadow-lg px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center fixed top-0 left-0 w-full z-50">
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link
            to="/"
            className="text-xl font-bold text-blue-600 flex items-center"
          >
            <div className="ml-2 md:ml-4">
              <img className="w-24 md:w-30 mx-auto" src={Logo} alt="logo" />
            </div>
            <span className="hidden md:inline">&nbsp;</span>
            <span className="text-lg text-gray-700 hover:text-blue-600 ml-2">
              feeds
            </span>
          </Link>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-blue-600 focus:outline-none"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-4 items-center relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-40 md:w-64 px-4 py-2 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm placeholder-gray-400"
            aria-label="Search"
          />
          {user ? (
            <>
              <Link
                to={`/profile/${user._id}`}
                className="text-sm text-gray-700 hover:text-blue-600"
              >
                {user.name}
              </Link>
              <span
                className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold hover:ring-2 hover:ring-blue-400 transition cursor-pointer"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                {user.name?.charAt(0) || "U"}
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-blue-600 font-semibold">
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm text-blue-600 font-semibold"
              >
                Register
              </Link>
              <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                U
              </span>
            </>
          )}
          {user && dropdownOpen && (
            <div
              ref={dropdownRef}
              className="p-4 absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-32 z-50"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}
                className="rounded-lg block w-full text-left px-4 py-2 text-sm text-white bg-red-600 hover:bg-blue-50 hover:text-blue-700 transition hover:cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="md:hidden flex flex-col gap-4 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 absolute top-16 left-0 w-full z-50"
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm placeholder-gray-400 mb-2"
              aria-label="Search"
            />
            {user ? (
              <>
                <Link
                  to={`/profile/${user._id}`}
                  className="text-sm text-gray-700 hover:text-blue-600"
                  onClick={() => setDropdownOpen(false)}
                >
                  {user.name}
                </Link>
                <span
                  className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold hover:ring-2 hover:ring-blue-400 transition cursor-pointer mx-auto"
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  {user.name?.charAt(0) || "U"}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                  className="rounded-lg block w-full text-left px-4 py-2 text-sm text-white bg-red-600 hover:bg-blue-50 hover:text-blue-700 transition hover:cursor-pointer mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-blue-600 font-semibold"
                  onClick={() => setDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm text-blue-600 font-semibold"
                  onClick={() => setDropdownOpen(false)}
                >
                  Register
                </Link>
                <span className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mx-auto">
                  U
                </span>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
