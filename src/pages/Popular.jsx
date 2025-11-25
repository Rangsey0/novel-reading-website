import React, { useEffect, useState } from "react";
import NovelCard from "../components/NovelCard";

function Popular() {
  const [novels, setNovels] = useState([]);
  const [sortedNovels, setSortedNovels] = useState([]);
  const [sortOption, setSortOption] = useState("views");
  const [currentPage, setCurrentPage] = useState(1);

  const novelsPerPage = 10;

  useEffect(() => {
    fetch("/data/novels.json")
      .then((res) => res.json())
      .then((data) => {
        const popularList = data.filter((item) => item.isPopular === true);
        setNovels(popularList);
        setSortedNovels(popularList);
      })
      .catch((err) => console.error("Failed to load novels:", err));
  }, []);

  useEffect(() => {
    let sorted = [...novels];
    switch (sortOption) {
      case "views":
        sorted.sort((a, b) => b.views - a.views);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "az":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
      default:
        break;
    }
    setSortedNovels(sorted);
    setCurrentPage(1);
  }, [sortOption, novels]);

  const totalPages = Math.ceil(sortedNovels.length / novelsPerPage);
  const indexOfLast = currentPage * novelsPerPage;
  const indexOfFirst = indexOfLast - novelsPerPage;
  const currentPageNovels = sortedNovels.slice(indexOfFirst, indexOfLast);

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
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm cursor-pointer"
        >
          <option value="views">Most Viewed</option>
          <option value="rating">Highest Rating</option>
          <option value="az">Title: A → Z</option>
          <option value="za">Title: Z → A</option>
          <option value="newest">Recently Updated</option>
        </select>
      </div>

      {currentPageNovels.length === 0 ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-300">
          No popular novels found.
        </p>
      ) : (
        <>
          {/* Novel Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {currentPageNovels.map((novel, index) => (
              <div key={novel.id} className="relative">
                {/* Ranking Badge */}
                <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-10">
                  #{indexOfFirst + index + 1}
                </div>
                <NovelCard novel={novel} />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-10 space-x-2 flex-wrap">
            {/* Previous */}
            <button
              className={`px-3 py-1 rounded-md text-white transition-all ${
                currentPage === 1
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600"
              }`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {/* Numbered Pages */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded-md transition-all ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-indigo-500 hover:text-white"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              className={`px-3 py-1 rounded-md text-white transition-all ${
                currentPage === totalPages
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600"
              }`}
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Popular;
