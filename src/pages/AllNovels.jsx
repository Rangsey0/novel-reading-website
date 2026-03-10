import React, { useState, useMemo } from "react";
import NovelCard from "../components/NovelCard";
import useNovels from "../hooks/useNovels";
import Loading from "../components/Loading";
import Error from "../components/Error";

function AllNovels() {
  const { novels, loading, error } = useNovels();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const novelsPerPage = 12;

  // ✅ Correctly get genres from novels
  const genres = useMemo(() => {
    const allGenres = novels.flatMap((n) => n.genre || []);
    return ["All", ...Array.from(new Set(allGenres))];
  }, [novels]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  // ✅ Filter novels using genre strings
  const filteredNovels =
    selectedGenre === "All"
      ? novels
      : novels.filter((n) => n.genre?.includes(selectedGenre));

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
        {currentNovels.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No novels found for this genre.
          </p>
        ) : (
          currentNovels.map((novel) => (
            <NovelCard key={novel.id} novel={novel} />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
}

export default AllNovels;
