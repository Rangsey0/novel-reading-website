import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NovelDetails from "./pages/NovelDetails";
import Chapter from "./pages/Chapter";
import AllNovels from "./pages/AllNovels";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novel/:id" element={<NovelDetails />} />
        <Route path="/novel/:id/chapter/:chapterId" element={<Chapter />} />

        {/* New routes */}
        <Route path="/browse" element={<AllNovels />} />
      </Routes>
    </Router>
  );
}

export default App;
