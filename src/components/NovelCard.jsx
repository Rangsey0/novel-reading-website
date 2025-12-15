import React from "react";
import { useNavigate } from "react-router-dom";

function NovelCard({ novel }) {
  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/novel/${novel.id}`);
  };

  return (
    <div
      onClick={goToDetail}
      className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl hover:shadow-4xl transition-transform transform hover:scale-105 hover:-translate-y-1 duration-500"
    >
      {/* Cover Image */}
      <img
        src={novel.cover || "/placeholder.jpg"} // fallback if cover missing
        alt={novel.title}
        className="w-full h-64 object-cover relative z-10 group-hover:brightness-90 transition-all duration-500"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-20"></div>

      {/* Text Content */}
      <div className="absolute bottom-0 p-5 text-white z-30">
        <h2 className="text-2xl font-extrabold tracking-wide">
          {novel.title || "Unknown Title"}
        </h2>
        <p className="text-sm text-gray-200">
          {novel.author || "Unknown Author"}
        </p>
        <p className="mt-2 text-xs line-clamp-3">{novel.description || ""}</p>

        {/* Genres */}
        <div className="mt-2 flex flex-wrap gap-2">
          {Array.isArray(novel.genre)
            ? novel.genre.map((g, index) => (
                <span
                  key={index}
                  className="bg-purple-600/70 text-white text-xs px-2 py-1 rounded-full"
                >
                  {g}
                </span>
              ))
            : null}
        </div>

        {/* Hover info panel */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs text-gray-300">
          Click to read more & explore this novel
        </div>
      </div>
    </div>
  );
}

export default NovelCard;
