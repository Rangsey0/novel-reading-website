import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function NovelDetails() {
  const { id } = useParams();
  const [novel, setNovel] = useState(null);

  useEffect(() => {
    fetch("/data/novels.json")
      .then((res) => res.json())
      .then((data) => setNovel(data.find((n) => n.id === parseInt(id))))
      .catch((error) => console.error("Error loading novel:", error));
  }, [id]);

  if (!novel)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

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

        <h1 className="absolute bottom-4 left-6 text-white text-4xl font-extrabold drop-shadow-xl">
          {novel.title}
        </h1>
      </div>

      {/* Author, Genre & Description */}
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 space-y-4">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          by {novel.author}
        </p>

        {/* Genres */}
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
          {novel.chapters.map((ch) => (
            <li key={ch.id}>
              <Link
                to={`/novel/${novel.id}/chapter/${ch.id}`}
                className="block px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                           bg-gradient-to-r from-blue-50 to-white dark:from-blue-900 dark:to-gray-800
                           shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300
                           text-blue-700 dark:text-blue-400 font-medium"
              >
                {ch.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NovelDetails;
