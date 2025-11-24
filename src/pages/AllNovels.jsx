import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllNovels() {
  const [novels, setNovels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genres, setGenres] = useState([]);

  const novelsPerPage = 12;

  useEffect(() => {
    fetch("/data/novels.json")
      .then((res) => res.json())
      .then((data) => {
        setNovels(data);

        // extract all unique genres from novels
        const allGenres = new Set();
        data.forEach((novel) => {
          if (novel.genre) {
            novel.genre.forEach((g) => allGenres.add(g));
          }
        });

        setGenres(["All", ...Array.from(allGenres)]);
      })
      .catch((err) => console.error("Failed to load novels:", err));
  }, []);

  // Filter novels by selected genre
  const filteredNovels =
    selectedGenre === "All"
      ? novels
      : novels.filter((novel) => novel.genre?.includes(selectedGenre));

  // Pagination
  const totalPages = Math.ceil(filteredNovels.length / novelsPerPage);

  const indexOfLast = currentPage * novelsPerPage;
  const indexOfFirst = indexOfLast - novelsPerPage;
  const currentNovels = filteredNovels.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Genre Filter */}
      <div className="flex justify-center mb-8">
        <select
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            setCurrentPage(1);
          }}
          className="
      px-4 py-2 rounded-lg shadow-md border
      bg-white text-gray-800
      dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700
      focus:outline-none focus:ring-2 focus:ring-indigo-500
      transition
    "
        >
          {genres.map((g, idx) => (
            <option
              key={idx}
              value={g}
              className="dark:bg-gray-800 dark:text-gray-200"
            >
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Novels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentNovels.map((novel) => (
          <Link
            key={novel.id}
            to={`/novel/${novel.id}`}
            className="group relative block rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <img
              src={novel.cover}
              alt={novel.title}
              className="w-full h-72 object-cover brightness-90 group-hover:brightness-75 transition-all duration-300"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-90"></div>

            <div className="absolute bottom-0 p-4">
              <h2 className="text-xl font-bold text-white">{novel.title}</h2>
              <p className="text-gray-300 text-sm mt-1">by {novel.author}</p>

              {/* Genres */}
              {novel.genre && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {novel.genre.map((g, index) => (
                    <span
                      key={index}
                      className="bg-purple-600/70 text-white text-xs px-2 py-1 rounded-full"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-gray-200 text-sm mt-2 line-clamp-3">
                {novel.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-3">
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
                : "bg-gray-200 hover:bg-gray-300"
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

export default AllNovels;
