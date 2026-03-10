// api.js
import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_USE_API === "true"
      ? "http://127.0.0.1:8000/api"
      : "/",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (!process.env.REACT_APP_USE_API) {
    if (config.url.startsWith("/novels/")) {
      const id = config.url.split("/")[2];
      config.url = "/data/novels.json"; // redirect to JSON
      config.transformResponse = [
        (data) => {
          const parsed = JSON.parse(data);
          return parsed.find((n) => n.id === parseInt(id));
        },
      ];
    } else if (config.url === "/novels") {
      config.url = "/data/novels.json";
    }
  }
  return config;
});

export default api;
