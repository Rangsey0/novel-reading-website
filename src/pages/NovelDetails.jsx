import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useNovel from "../hooks/useNovel";
import Loading from "../components/Loading";
import Error from "../components/Error";

function NovelDetails() {
  const { id } = useParams();
  const { novel, loading, error } = useNovel(id);
  const [isSaved, setIsSaved] = useState(false);

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
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      {/* Top Section */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cover */}
        <div className="md:col-span-1">
          <img
            src={novel.cover}
            alt={novel.title}
            className="w-full rounded-2xl shadow-2xl"
          />
        </div>

        {/* Info */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {novel.title}
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg">
            by {novel.author}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-yellow-400 text-lg">
                {"⭐".repeat(Math.round(novel.rating))}
              </div>

              <span className="text-gray-700 dark:text-gray-300">
                {novel.rating} / 5
              </span>
            </div>

            <span className="text-gray-500">
              👁 {novel.views.toLocaleString()} views
            </span>
          </div>

          {/* Extra Info */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            <span>📅 Updated: {novel.updatedAt}</span>

            <span>📚 Chapters: {novel.chapters?.length || 0}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Link
              to={`/novel/${novel.id}/chapter/${novel.chapters[0]?.id}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
            >
              📖 Start Reading
            </Link>

            <button
              onClick={saveNovel}
              disabled={isSaved}
              className={`px-5 py-2 rounded-xl text-white font-medium shadow-lg transition
    ${isSaved ? "bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"}`}
            >
              {isSaved ? "Saved ✓" : "⭐ Save"}
            </button>
          </div>

          {/* Genres */}
          {novel.genre && (
            <div className="flex flex-wrap gap-2 pt-2">
              {novel.genre.map((g, index) => (
                <span
                  key={index}
                  className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full"
                >
                  {g}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed pt-3">
            {novel.description}
          </p>
        </div>
      </div>

      {/* Chapters */}
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Chapters
        </h2>

        <ul className="grid md:grid-cols-2 gap-4">
          {novel.chapters && novel.chapters.length > 0 ? (
            novel.chapters.map((ch) => (
              <li key={ch.id}>
                <Link
                  to={`/novel/${novel.id}/chapter/${ch.id}`}
                  className="block px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                  hover:bg-blue-50 dark:hover:bg-gray-800 transition"
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
