import React, { useEffect, useState } from "react";
import api from "../services/api";
import NovelCard from "../components/NovelCard";

function AllNovels() {
  const [novels, setNovels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genres, setGenres] = useState([]);

  const novelsPerPage = 12;

  useEffect(() => {
    api
      .get("/novels")
      .then((res) => {
        setNovels(res.data);

        // Extract unique genre names from API
        const allGenres = new Set();
        res.data.forEach((novel) => {
          if (novel.genres && Array.isArray(novel.genres)) {
            novel.genres.forEach((g) => allGenres.add(g.name));
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
      : novels.filter((novel) =>
          novel.genres?.some((g) => g.name === selectedGenre),
        );

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
            <option key={idx} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Novels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentNovels.map((novel) => (
          <NovelCard key={novel.id} novel={novel} />
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
