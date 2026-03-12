import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import useNovels from "../hooks/useNovels";

function SearchBar() {
  const { novels } = useNovels();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const filtered = novels.filter((novel) =>
      novel.title.toLowerCase().includes(query.toLowerCase()),
    );

    setResults(filtered.slice(0, 5));
  }, [query, novels]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full md:w-60">
      {/* Search Input */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search novels..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border
          border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div
          className="absolute mt-2 w-full bg-white dark:bg-gray-800 border
          border-gray-300 dark:border-gray-700
          rounded-lg shadow-lg z-50 overflow-hidden"
        >
          {results.map((novel) => (
            <Link
              key={novel.id}
              to={`/novel/${novel.id}`}
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <img
                src={novel.cover}
                alt={novel.title}
                className="w-8 h-10 object-cover rounded"
              />

              <span className="text-sm line-clamp-1">{novel.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
