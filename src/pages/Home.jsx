import React, { useEffect, useState } from "react";
import NovelCard from "../components/NovelCard";

function Home() {
  const [novels, setNovels] = useState([]);

  useEffect(() => {
    fetch("/data/novels.json")
      .then((res) => res.json())
      .then((data) => {
        // Only take the first novels
        setNovels(data.slice(0, 6));
      })
      .catch((error) => console.error("Error loading novels:", error));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {novels.map((novel) => (
        <NovelCard key={novel.id} novel={novel} />
      ))}
    </div>
  );
}

export default Home;
