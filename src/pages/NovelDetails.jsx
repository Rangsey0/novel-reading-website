// src/pages/NovelDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useNovel from "../hooks/useNovel"; // <- fix import
import Loading from "../components/Loading";
import Error from "../components/Error";

function NovelDetails() {
  const { id } = useParams();
  const { novel, loading, error } = useNovel(id);
  const [isSaved, setIsSaved] = useState(false);

  // Check if the novel is already saved in localStorage
  useEffect(() => {
    if (novel) {
      const saved = JSON.parse(localStorage.getItem("savedNovels")) || [];
      setIsSaved(saved.some((n) => n.id === novel.id));
    }
  }, [novel]);

  const saveNovel = () => {
    if (!novel) return;
    const saved = JSON.parse(localStorage.getItem("savedNovels")) || [];
    if (!saved.some((n) => n.id === novel.id)) {
      saved.push({
        id: novel.id,
        title: novel.title,
        cover: novel.cover,
        author: novel.author,
      });
      localStorage.setItem("savedNovels", JSON.stringify(saved));
      setIsSaved(true);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!novel)
    return <p className="text-center mt-10 text-gray-500">Novel not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Cinematic Cover */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-xl scale-105"
          style={{ backgroundImage: `url(${novel.cover})` }}
        ></div>

        <img
          src={novel.cover}
          alt={novel.title}
          className="relative w-full h-64 object-cover rounded-2xl transform transition-transform duration-500 hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>

        <div className="absolute bottom-4 left-6 flex items-center gap-4">
          <h1 className="text-white text-4xl font-extrabold drop-shadow-xl">
            {novel.title}
          </h1>

          <button
            onClick={saveNovel}
            disabled={isSaved}
            className={`px-4 py-2 rounded-xl text-white text-sm font-medium shadow-lg
              transition-all duration-300
              ${isSaved ? "bg-green-600 cursor-default" : "bg-yellow-500 hover:bg-yellow-600"}`}
          >
            {isSaved ? "Saved ✓" : "⭐ Save"}
          </button>
        </div>
      </div>

      {/* Author, Genre & Description */}
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 space-y-4">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          by {novel.author}
        </p>

        {novel.genre && (
          <div className="flex flex-wrap gap-2">
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

        <p className="text-gray-800 dark:text-gray-100 text-base leading-relaxed">
          {novel.description}
        </p>
      </div>

      {/* Chapters List */}
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Chapters
        </h2>
        <ul className="space-y-3">
          {novel.chapters && novel.chapters.length > 0 ? (
            novel.chapters.map((ch) => (
              <li key={ch.id}>
                <Link
                  to={`/novel/${novel.id}/chapter/${ch.id}`} // use chapter id
                  className="block px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                             bg-gradient-to-r from-blue-50 to-white dark:from-blue-900 dark:to-gray-800
                             shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300
                             text-blue-700 dark:text-blue-400 font-medium"
                >
                  {ch.title}
                </Link>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No chapters available.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NovelDetails;
