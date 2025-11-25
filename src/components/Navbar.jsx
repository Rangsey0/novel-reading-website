import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Desktop Browse dropdown
  const [theme, setTheme] = useState("dark");

  // Apply theme to <html>
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <nav className="bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-lg text-black dark:text-white relative transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
        >
          Seynovel
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Desktop Browse Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="browse-dropdown-btn flex items-center hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300">
              <Menu size={26} />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-1/2 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg animate-fade-in-down z-50 text-black dark:text-white -translate-x-1/2">
                <Link
                  to="/browse"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  All Novels
                </Link>
                <Link
                  to="/popular"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Popular
                </Link>
              </div>
            )}
          </div>

          {/* Profile Button */}
          <Link
            to="/profile"
            className="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-300 font-medium text-white"
          >
            Profile
          </Link>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 px-4 py-3 space-y-3 animate-fade-in-down text-black dark:text-white">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex justify-center"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link
            to="/browse"
            onClick={() => setIsOpen(false)}
            className="block text-lg hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300"
          >
            📚 Browse Novels
          </Link>

          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="block bg-indigo-500 text-center py-2 rounded-lg hover:bg-indigo-600 transition-all duration-300 font-medium text-white"
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
