import React from "react";

function CategoryFilter({ categories, selectedCategory, onSelect }) {
  return (
    <div className="flex gap-3 my-5 flex-wrap">
      <button
        className={`px-4 py-2 rounded ${
          selectedCategory === "All" ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
        onClick={() => onSelect("All")}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-2 rounded ${
            selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
