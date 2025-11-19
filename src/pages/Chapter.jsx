import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Chapter() {
  const { id, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    fetch("/data/novels.json")
      .then((res) => res.json())
      .then((data) => {
        const novel = data.find((n) => n.id === parseInt(id));
        const ch = novel.chapters.find((c) => c.id === parseInt(chapterId));
        setChapter({ ...ch, novelTitle: novel.title });
      });
  }, [id, chapterId]);

  if (!chapter) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto text-justify leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">{chapter.title}</h1>
      <p className="mb-6">{chapter.content}</p>
      <Link to={`/novel/${id}`} className="text-blue-500 hover:underline">
        ← Back to {chapter.novelTitle}
      </Link>
    </div>
  );
}

export default Chapter;
