import React, { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [savedNovels, setSavedNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/data/profile.json");
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();

    const saved = JSON.parse(localStorage.getItem("savedNovels")) || [];
    setSavedNovels(saved);
  }, []);

  const removeNovel = (id) => {
    const updated = savedNovels.filter((n) => n.id !== id);
    setSavedNovels(updated);
    localStorage.setItem("savedNovels", JSON.stringify(updated));
  };

  // ⌛ Loading Skeleton
  if (loading) {
    return (
      <div className="animate-pulse p-8 max-w-xl mx-auto">
        <div className="h-28 w-28 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 text-black dark:text-white">
      {/* Profile Card with Gradient + Glassmorphism */}
      <div className="relative bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-300 dark:border-gray-700 p-8 rounded-3xl shadow-2xl max-w-xl mx-auto mb-12 text-center">
        {/* Top Gradient Decorative Line */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-3xl"></div>

        <img
          src={profile?.profileImage}
          alt="User Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-xl mx-auto"
        />

        <h2 className="text-3xl font-extrabold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          {profile?.userName}
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {profile?.userEmail}
        </p>

        <button
          disabled
          className="mt-5 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-90 px-5 py-2 rounded-xl text-white font-semibold shadow-md hover:opacity-100 transition cursor-not-allowed"
        >
          Edit Profile (Coming Soon)
        </button>
      </div>

      {/* Saved Novels Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-2xl font-bold">⭐ Saved Novels</h3>
        {savedNovels.length > 0 && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {savedNovels.length} saved
          </span>
        )}
      </div>

      {/* Empty State */}
      {savedNovels.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 italic text-center">
          No saved novels yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {savedNovels.map((novel) => (
            <div
              key={novel.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.03] hover:shadow-2xl transition duration-300"
            >
              <img
                src={novel.cover}
                alt={novel.title}
                className="h-44 w-full object-cover"
              />

              <div className="p-3">
                <h4 className="font-semibold text-sm line-clamp-2 mb-2">
                  {novel.title}
                </h4>

                <button
                  onClick={() => removeNovel(novel.id)}
                  className="w-full bg-red-500 text-white text-sm py-1.5 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
