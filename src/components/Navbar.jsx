import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, User } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [profileImage, setProfileImage] = useState(null);

  const location = useLocation();

  // Load profile image
  useEffect(() => {
    fetch("/data/profile.json")
      .then((res) => res.json())
      .then((data) => setProfileImage(data.profileImage))
      .catch(() => setProfileImage(null));
  }, []);

  // Apply theme
  useEffect(() => {
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [theme]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsDropdownOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Helper to check active route
  const isActive = (path) =>
    location.pathname === path
      ? "text-indigo-500 dark:text-indigo-400 font-semibold"
      : "hover:text-indigo-500 dark:hover:text-indigo-400";

  return (
    <nav className="backdrop-blur-md bg-white/70 dark:bg-gray-900/60 shadow-lg sticky top-0 z-50 transition-all">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide text-indigo-600 dark:text-indigo-400"
        >
          Seynovel
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Browse Dropdown (click) */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className={`flex items-center gap-1 ${isActive(
                "/browse"
              )} transition-colors`}
            >
              <Menu size={25} />
            </button>

            {isDropdownOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-1/2 mt-3 w-48 -translate-x-1/2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl animate-fade-in-down z-50"
              >
                <Link
                  to="/browse"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  📚 All Novels
                </Link>
                <Link
                  to="/popular"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  ⭐ Popular
                </Link>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Profile Avatar */}
          <Link to="/profile" className="relative group">
            {profileImage ? (
              <img
                src={profileImage}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500 shadow-md group-hover:scale-105 transition"
              />
            ) : (
              <User
                size={32}
                className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
              />
            )}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-4 space-y-4 animate-fade-in-down">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full p-3 bg-gray-200 dark:bg-gray-700 rounded-lg flex justify-center text-black dark:text-white"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            to="/browse"
            onClick={() => setIsOpen(false)}
            className="block text-lg py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            📚 All Novels
          </Link>

          <Link
            to="/popular"
            onClick={() => setIsOpen(false)}
            className="block text-lg py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            ⭐ Popular
          </Link>

          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <User size={26} />
            )}
            <span>Profile</span>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
