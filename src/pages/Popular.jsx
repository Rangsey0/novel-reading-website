import React, { useState, useMemo } from "react";
import NovelCard from "../components/NovelCard";
import useNovels from "../hooks/useNovels";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Popular() {
  const { novels, loading, error } = useNovels();
  const [sortOption, setSortOption] = useState("views");
  const [currentPage, setCurrentPage] = useState(1);

  const novelsPerPage = 12;

  // ✅ Use correct field: isPopular
  const popularNovels = useMemo(
    () => novels.filter((n) => n.isPopular === true),
    [novels],
  );

  // Sort popular novels based on selected sort option
  const sortedNovels = useMemo(() => {
    return [...popularNovels].sort((a, b) => {
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
  }, [popularNovels, sortOption]);

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

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="container mx-auto px-4 py-10 animate-fade-in">
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
            <NovelCard
              key={novel.id}
              novel={novel}
              rank={indexOfFirst + index + 1}
            />
          ))}
        </div>
      )}

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
      )}
    </div>
  );
}

export default Popular;
