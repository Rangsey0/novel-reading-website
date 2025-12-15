import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api"; // Axios instance

function Chapter() {
  const { id, chapterId } = useParams();
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    api
      .get(`/novels/${id}`)
      .then((res) => {
        const novel = res.data;

        // Find chapter by chapter_number
        const ch = novel.chapters.find(
          (c) => c.chapter_number === parseInt(chapterId)
        );

        if (ch) {
          setChapter({ ...ch, novelTitle: novel.title });
        } else {
          setChapter({
            title: "Chapter not found",
            content: "",
            novelTitle: novel.title,
          });
        }
      })
      .catch((err) => {
        console.error("Failed to load chapter:", err);
        setChapter({
          title: "Error",
          content: "Could not load chapter.",
          novelTitle: "",
        });
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
