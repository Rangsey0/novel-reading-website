// src/hooks/useNovel.js
import { useState, useEffect } from "react";
import api from "../services/api";

function useNovel(id) {
  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    api
      .get(`/novels/${id}`)
      .then((res) => {
        if (res.data) {
          setNovel(res.data);
        } else {
          setNovel(null);
        }
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

export default useNovel;
