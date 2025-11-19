import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NovelDetails from "./pages/NovelDetails";
import Chapter from "./pages/Chapter";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novel/:id" element={<NovelDetails />} />
        <Route path="/novel/:id/chapter/:chapterId" element={<Chapter />} />
      </Routes>
    </Router>
  );
}

export default App;
