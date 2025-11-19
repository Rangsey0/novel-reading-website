import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg text-white relative">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide hover:text-indigo-400 transition-colors duration-300"
        >
          Seynovel
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Browse Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-lg hover:text-indigo-400 transition-colors duration-300">
              📚 <span>Browse</span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg animate-fade-in-down z-50">
                <Link
                  to="/browse"
                  className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                >
                  All Novels
                </Link>
                <Link
                  to="/popular"
                  className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                >
                  Popular
                </Link>
                <Link
                  to="/latest"
                  className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                >
                  Latest Updates
                </Link>
                <Link
                  to="/genres"
                  className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                >
                  Genres
                </Link>
              </div>
            )}
          </div>

          {/* Profile Button */}
          <Link
            to="/profile"
            className="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-300 font-medium"
          >
            Profile
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-4 py-3 space-y-3 animate-fade-in-down">
          <Link
            to="/browse"
            onClick={() => setIsOpen(false)}
            className="block text-lg hover:text-indigo-400 transition-colors duration-300"
          >
            📚 Browse Novels
          </Link>

          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="block bg-indigo-500 text-center py-2 rounded-lg hover:bg-indigo-600 transition-all duration-300 font-medium"
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
