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
      {/* Glowing animated border */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition-all duration-500"></div>

      {/* Cover Image */}
      <img
        src={novel.cover}
        alt={novel.title}
        className="w-full h-64 object-cover relative z-10 group-hover:brightness-90 transition-all duration-500"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-20"></div>

      {/* Text Content */}
      <div className="absolute bottom-0 p-5 text-white z-30">
        <h2 className="text-2xl font-extrabold tracking-wide">{novel.title}</h2>
        <p className="text-sm text-gray-200">{novel.author}</p>
        <p className="mt-2 text-xs line-clamp-3">{novel.description}</p>

        {/* Hover info panel */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs text-gray-300">
          Click to read more & explore this novel
        </div>
      </div>

      {/* Floating particles (simple glowing dots) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className={`absolute w-2 h-2 bg-white rounded-full opacity-70 animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random()}s`,
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default NovelCard;
