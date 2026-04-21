import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NovelDetails from "./pages/NovelDetails";
import Chapter from "./pages/Chapter";
import AllNovels from "./pages/AllNovels";
import Popular from "./pages/Popular";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Router>
        <Navbar />

        <div className="pt-4 px-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/novel/:id" element={<NovelDetails />} />
            <Route path="/novel/:id/chapter/:chapterId" element={<Chapter />} />

            <Route path="/browse" element={<AllNovels />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
