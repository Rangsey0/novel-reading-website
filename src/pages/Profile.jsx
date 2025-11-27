import React, { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [savedNovels, setSavedNovels] = useState([]);

  // Fetch profile info from your GitHub JSON
  useEffect(() => {
    fetch("/data/profile.json")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Failed to load profile:", err));

    // Load saved novels from localStorage
    const saved = JSON.parse(localStorage.getItem("savedNovels")) || [];
    setSavedNovels(saved);
  }, []);

  // Remove a novel from saved list
  const removeNovel = (id) => {
    const updated = savedNovels.filter((n) => n.id !== id);
    setSavedNovels(updated);
    localStorage.setItem("savedNovels", JSON.stringify(updated));
  };

  if (!profile) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-300">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-black dark:text-white">
      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-col items-center">
          <img
            src={profile.profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500"
          />
          <h2 className="text-2xl font-bold mt-4">{profile.userName}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {profile.userEmail}
          </p>

          <button className="mt-4 bg-indigo-500 px-4 py-2 rounded-lg text-white hover:bg-indigo-600 transition-all">
            Edit Profile (Coming Soon)
          </button>
        </div>
      </div>

      {/* Saved Novels Section */}
      <h3 className="text-xl font-semibold mb-4">⭐ Saved Novels</h3>

      {savedNovels.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No saved novels yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {savedNovels.map((novel) => (
            <div
              key={novel.id}
              className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-md p-3 flex flex-col"
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
                className="mt-3 bg-red-500 text-white text-sm py-1 rounded-lg hover:bg-red-600"
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
