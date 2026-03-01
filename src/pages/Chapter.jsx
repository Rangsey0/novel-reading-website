import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";
import Error from "../components/Error";

// Custom hook to fetch a single novel by ID
function useNovel(id) {
  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/novels/${id}`)
      .then((res) => {
        setNovel(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load novel.");
        setLoading(false);
      });
  }, [id]);

  return { novel, loading, error };
}

function Chapter() {
  const { id, chapterId } = useParams();
  const { novel, loading, error } = useNovel(id);
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  const chapters = novel.chapters || [];
  const currentChapterIndex = chapters.findIndex(
    (c) => c.chapter_number === parseInt(chapterId),
  );

  const chapter =
    currentChapterIndex !== -1
      ? { ...chapters[currentChapterIndex], novelTitle: novel.title }
      : { title: "Chapter not found", content: "", novelTitle: novel.title };

  const prevChapter =
    currentChapterIndex > 0 ? chapters[currentChapterIndex - 1] : null;
  const nextChapter =
    currentChapterIndex < chapters.length - 1
      ? chapters[currentChapterIndex + 1]
      : null;

  return (
    <div className="p-6 max-w-3xl mx-auto text-justify leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">{chapter.title}</h1>
      <p className="mb-6">{chapter.content}</p>

      <div className="flex justify-between mt-8">
        {/* Previous Chapter */}
        <div className="w-1/3">
          {prevChapter ? (
            <button
              onClick={() =>
                navigate(`/novel/${id}/chapter/${prevChapter.chapter_number}`)
              }
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              ← {prevChapter.title}
            </button>
          ) : (
            <div className="invisible px-4 py-2">Placeholder</div>
          )}
        </div>

        {/* Back to Novel */}
        <div className="w-1/3 flex justify-center">
          <Link
            to={`/novel/${id}`}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Back to {novel.title}
          </Link>
        </div>

        {/* Next Chapter */}
        <div className="w-1/3 flex justify-end">
          {nextChapter ? (
            <button
              onClick={() =>
                navigate(`/novel/${id}/chapter/${nextChapter.chapter_number}`)
              }
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
            >
              {nextChapter.title} →
            </button>
          ) : (
            <div className="invisible px-4 py-2">Placeholder</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chapter;
