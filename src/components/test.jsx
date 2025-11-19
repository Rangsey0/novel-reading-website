import React from "react";
import { Link } from "react-router-dom";

function NovelCard({ novel }) {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <img
        src={novel.cover}
        alt={novel.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg">{novel.title}</h2>
        <p className="text-gray-600">{novel.author}</p>
        <p className="mt-2 text-sm">{novel.description}</p>
        <Link
          to={`/novel/${novel.id}`}
          className="mt-3 inline-block text-blue-500"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default NovelCard;
