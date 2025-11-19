import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllNovels() {
  const [novels, setNovels] = useState([]);

  useEffect(() => {
    fetch("/data/novels.json")
      .then((res) => res.json())
      .then((data) => setNovels(data))
      .catch((err) => console.error("Failed to load novels:", err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500 drop-shadow-lg animate-pulse">
        All Novels
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {novels.map((novel) => (
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
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

            {/* Text */}
            <div className="absolute bottom-0 p-4">
              <h2 className="text-xl font-bold text-white drop-shadow-lg">
                {novel.title}
              </h2>
              <p className="text-gray-300 text-sm mt-1 drop-shadow-sm">
                by {novel.author}
              </p>
              <p className="text-gray-200 text-sm mt-2 line-clamp-3 drop-shadow-sm">
                {novel.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllNovels;
