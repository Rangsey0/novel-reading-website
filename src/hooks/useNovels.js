// src/hooks/useNovels.js
import { useEffect, useState } from "react";
import api from "../services/api";

function useNovels() {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    api
      .get("/data/novels.json") // <-- fetch from your JSON
      .then((res) => {
        setNovels(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load novels.");
        setLoading(false);
      });
  }, []);

  return { novels, loading, error };
}

export default useNovels;
