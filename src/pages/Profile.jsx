import React, { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [savedNovels, setSavedNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch profile + saved novels
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

    // Load saved novels
    const saved = JSON.parse(localStorage.getItem("savedNovels")) || [];
    setSavedNovels(saved);
  }, []);

  // Remove saved novel
  const removeNovel = (id) => {
    const updated = savedNovels.filter((n) => n.id !== id);
    setSavedNovels(updated);
    localStorage.setItem("savedNovels", JSON.stringify(updated));
  };

  // 🟦 Loading skeleton
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
    <div className="container mx-auto px-4 py-8 text-black dark:text-white">
      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-col items-center">
          <img
            src={profile?.profileImage}
            alt="User Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-md"
          />
          <h2 className="text-2xl font-bold mt-4">{profile?.userName}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {profile?.userEmail}
          </p>

          <button
            disabled
            className="mt-4 bg-indigo-500 opacity-80 px-4 py-2 rounded-lg text-white hover:bg-indigo-600 transition-all cursor-not-allowed"
          >
            Edit Profile (Coming Soon)
          </button>
        </div>
      </div>

      {/* Saved Novels Section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">⭐ Saved Novels</h3>
        {savedNovels.length > 0 && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {savedNovels.length} saved
          </span>
        )}
      </div>

      {savedNovels.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 italic">
          No saved novels yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {savedNovels.map((novel) => (
            <div
              key={novel.id}
              className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-md p-3 flex flex-col hover:shadow-lg transition"
            >
              <img
                src={novel.cover}
                alt={novel.title}
                className="h-40 w-full object-cover rounded-lg"
              />
              <h4 className="mt-2 font-semibold text-sm line-clamp-2">
                {novel.title}
              </h4>

              <button
                onClick={() => removeNovel(novel.id)}
                className="mt-3 bg-red-500 text-white text-sm py-1 rounded-lg hover:bg-red-600 transition-all"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
