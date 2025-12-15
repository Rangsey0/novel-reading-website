import React, { useEffect, useState } from "react";
import NovelCard from "../components/NovelCard";
import MostViewedCard from "../components/MostViewedCard";
import api from "../services/api";

function Home() {
  const [novels, setNovels] = useState([]);
  const [mostViewed, setMostViewed] = useState([]);

  useEffect(() => {
    api
      .get("/novels")
      .then((res) => {
        const data = res.data;

        // Left side: first 6 novels
        setNovels(data.slice(0, 6));

        // Right side: sort by views
        const sorted = [...data].sort((a, b) => b.views - a.views);
        setMostViewed(sorted.slice(0, 15));
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* LEFT SIDE — Latest novels */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {novels.map((novel) => (
          <NovelCard key={novel.id} novel={novel} />
        ))}
      </div>

      {/* RIGHT SIDE — Most Viewed */}
      <div className="lg:col-span-1 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md h-[600px] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Most Viewed</h2>

        <div className="space-y-4">
          {mostViewed.map((novel, index) => (
            <MostViewedCard key={novel.id} novel={novel} rank={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
