// src/pages/Chapter.jsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useNovel from "../hooks/useNovel";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Chapter() {
  const { id, chapterId } = useParams();
  const { novel, loading, error } = useNovel(id);
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!novel)
    return <p className="text-center mt-10 text-gray-500">Novel not found.</p>;

  const chapters = novel.chapters || [];

  // Find chapter index using the actual chapter id from JSON
  const currentChapterIndex = chapters.findIndex(
    (c) => c.id === parseInt(chapterId),
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
    <div className="p-6 max-w-3xl mx-auto text-justify leading-relaxed space-y-6">
      {/* Chapter Title */}
      <h1 className="text-2xl font-bold">
        {chapter.title}{" "}
        {chapters.length > 0 &&
          `(Chapter ${currentChapterIndex + 1} of ${chapters.length})`}
      </h1>

      {/* Chapter Content */}
      <p className="text-gray-800 dark:text-gray-100">{chapter.content}</p>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {/* Previous Chapter */}
        <div className="w-1/3">
          {prevChapter ? (
            <button
              onClick={() => navigate(`/novel/${id}/chapter/${prevChapter.id}`)}
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
              onClick={() => navigate(`/novel/${id}/chapter/${nextChapter.id}`)}
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
