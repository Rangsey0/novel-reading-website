import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Popular() {
  const [novels, setNovels] = useState([]);
  const [sortOption, setSortOption] = useState("views");
  const [currentPage, setCurrentPage] = useState(1);

  const novelsPerPage = 12;

  useEffect(() => {
    fetch("/data/novels.json")
      .then((res) => res.json())
      .then((data) => {
        const popularList = data.filter((item) => item.isPopular === true);
        setNovels(popularList);
      })
      .catch((err) => console.error("Failed to load novels:", err));
  }, []);

  // Sort novels
  const sortedNovels = [...novels].sort((a, b) => {
    switch (sortOption) {
      case "views":
        return b.views - a.views;
      case "rating":
        return b.rating - a.rating;
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      case "newest":
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedNovels.length / novelsPerPage);
  const indexOfLast = currentPage * novelsPerPage;
  const indexOfFirst = indexOfLast - novelsPerPage;
  const currentNovels = sortedNovels.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 animate-fade-in">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center mb-6 tracking-wide text-indigo-600 dark:text-indigo-400">
        🔥 Popular Novels
      </h1>

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-6">
        <select
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm cursor-pointer"
        >
          <option value="views">Most Viewed</option>
          <option value="rating">Highest Rating</option>
          <option value="az">Title: A → Z</option>
          <option value="za">Title: Z → A</option>
          <option value="newest">Recently Updated</option>
        </select>
      </div>

      {/* Novels Grid */}
      {currentNovels.length === 0 ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-300">
          No popular novels found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentNovels.map((novel, index) => (
            <Link
              key={novel.id}
              to={`/novel/${novel.id}`}
              className="group relative block rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              {/* Cover */}
              <img
                src={novel.cover}
                alt={novel.title}
                className="w-full h-72 object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
              />

              {/* Rank Badge */}
              <div
                className={`absolute top-2 left-2 text-xs font-bold px-3 py-1 rounded-md shadow-lg z-20 text-white ${
                  indexOfFirst + index + 1 === 1
                    ? "bg-yellow-400"
                    : indexOfFirst + index + 1 === 2
                    ? "bg-gray-400"
                    : indexOfFirst + index + 1 === 3
                    ? "bg-orange-400"
                    : "bg-indigo-600"
                }`}
              >
                #{indexOfFirst + index + 1}
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-90"></div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 p-4 w-full">
                <h2 className="text-xl font-bold text-white">{novel.title}</h2>
                <p className="text-gray-300 text-sm mt-1">by {novel.author}</p>

                {/* Genres */}
                {novel.genre && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {novel.genre.map((g, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-600/70 text-white text-xs px-2 py-1 rounded-full"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-200 text-sm mt-2 line-clamp-3">
                  {novel.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-3 flex-wrap">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToPage(idx + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === idx + 1
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Popular;
