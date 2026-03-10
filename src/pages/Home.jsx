import React, { useEffect, useState } from "react";
import NovelCard from "../components/NovelCard";
import MostViewedCard from "../components/MostViewedCard";
import useNovels from "../hooks/useNovels";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Home() {
  const { novels, loading, error } = useNovels();
  const [mostViewed, setMostViewed] = useState([]);

  // Compute most viewed novels whenever novels change
  useEffect(() => {
    if (novels.length > 0) {
      const sortedByViews = [...novels].sort((a, b) => b.views - a.views);
      setMostViewed(sortedByViews.slice(0, 15));
    }
  }, [novels]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  // Get the 6 newest novels by updated_at
  const latestNovels = [...novels]
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 6);

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* LEFT SIDE — Latest novels */}
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {latestNovels.map((novel) => (
          <NovelCard key={novel.id} novel={novel} />
        ))}
      </div>

      {/* RIGHT SIDE — Most Viewed */}
      <div className="lg:col-span-1 bg-white dark:bg-black p-4 rounded-xl shadow-md h-[600px] overflow-y-auto">
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
