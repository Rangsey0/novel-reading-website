import React from "react";
import { Link } from "react-router-dom";

function MostViewedCard({ novel, rank }) {
  // Badge colors for top 3
  const badgeColors = {
    1: "bg-yellow-400 text-yellow-900 shadow-yellow-300",
    2: "bg-gray-300 text-gray-800 shadow-gray-300",
    3: "bg-amber-600 text-white shadow-amber-300",
  };

  const isTopThree = rank <= 3;

  return (
    <Link
      to={`/novel/${novel.id}`}
      className="flex items-center gap-3 border-b pb-3 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md transition group"
    >
      {/* Rank number / Badge */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full font-extrabold text-lg shadow 
        ${isTopThree ? badgeColors[rank] : "text-gray-400"}
        ${isTopThree ? "animate-pulse" : ""}`}
      >
        {rank}
      </div>

      {/* Image with hover zoom */}
      <div className="overflow-hidden rounded">
        <img
          src={novel.cover}
          alt={novel.title}
          className="w-12 h-16 object-cover rounded transform group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <h3 className="font-semibold text-sm line-clamp-2">{novel.title}</h3>
        <p className="text-xs text-gray-500">{novel.views} views</p>
      </div>
    </Link>
  );
}

export default MostViewedCard;
