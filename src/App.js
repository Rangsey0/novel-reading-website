import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NovelDetails from "./pages/NovelDetails";
import Chapter from "./pages/Chapter";
import AllNovels from "./pages/AllNovels";
import Popular from "./pages/Popular";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <Router>
        <Navbar />

        <div className="pt-4 px-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/novel/:id" element={<NovelDetails />} />
            <Route path="/novel/:id/chapter/:chapterId" element={<Chapter />} />

            {/* New routes */}
            <Route path="/browse" element={<AllNovels />} />
            <Route path="/popular" element={<Popular />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
